import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "../hooks/useLocalStorage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/** Context: provides currentUser object and setter for it throughout app. */

/** True if the JWT is not expired and carries the uId the API requires. */
function isUsableToken(token) {
  try {
    const { exp, uId } = jwtDecode(token);
    return !!uId && (!exp || exp * 1000 > Date.now());
  } catch {
    return false;
  }
}

const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = (props) => {
  const [token, setToken] = useLocalStorage("serve-token");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Drop a token that has expired or predates the uId claim, so we never
  // send one the API will reject. (Runs before the header is set below.)
  if (token && !isUsableToken(token)) {
    localStorage.removeItem("serve-token");
    setToken(null);
  }

  // Attach the JWT to every API request (the backend's auth middleware reads it).
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.common.Authorization;

  // If the API ever answers 401 (token expired or revoked), sign out.
  // 403 means "signed in but not allowed" and is left to the caller.
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 && axios.defaults.headers.common.Authorization) {
          setCurrentUser(null);
          setToken(null);
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [setToken]);

  useEffect(() => {
    // If the token changes (e.g. a 401 signed us out) while this request is
    // in flight, ignore its result so a stale user can't be restored.
    let cancelled = false;
    setLoading(true);
    const loadCurrentUser = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }
      try {
        let { username } = jwtDecode(token);
        let currentUser = await axios.get(`${BASE_URL}/users/${username}`);
        if (!cancelled) setCurrentUser(currentUser.data);
      } catch (e) {
        if (!cancelled) setCurrentUser(null);
      }
    };
    loadCurrentUser();
    setLoading(false);
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) return <div>Still loading your information...</div>;

  return (
    <Provider value={{ token, setToken, currentUser, setCurrentUser }}>
      {props.children}
    </Provider>
  );
};

export { UserProvider, UserContext };
