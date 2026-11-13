import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/** Context: provides allll the data for the app. */

const DataContext = React.createContext();
const { Provider } = DataContext;

const DataProvider = (props) => {
  const [ministries, setMinistries] = useState([]);
  const [eventTemplates, setEventTemplates] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [scheduledRoles, setScheduledRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(UserContext);

  // Loads everything in parallel. Endpoints the current user can't access
  // (e.g. admin-only /ministries for a volunteer) just come back empty
  // instead of leaving the app stuck on "loading".
  const getData = async () => {
    setLoading(true);
    const get = (path) =>
      axios.get(`${BASE_URL}${path}`).then((r) => r.data).catch(() => []);
    const [m, r, et, u, sr] = await Promise.all([
      get("/ministries"),
      get("/roles"),
      get("/event-templates"),
      get("/users"),
      get("/scheduled-events/roles"),
    ]);
    setMinistries(m);
    setRoles(r);
    setEventTemplates(et);
    setUsers(u);
    setScheduledRoles(sr);
    setLoading(false);
  };

  useEffect(() => {
    if (token) getData();
    else setLoading(false);
  }, [token]);

  if (loading) return <div>Still loading data...</div>;

  return (
    <Provider
      value={{
        loading,
        setLoading,
        ministries,
        setMinistries,
        roles,
        setRoles,
        eventTemplates,
        setEventTemplates,
        users,
        setUsers,
        scheduledRoles,
        setScheduledRoles,
      }}>
      {props.children}
    </Provider>
  );
};

export { DataProvider, DataContext };
