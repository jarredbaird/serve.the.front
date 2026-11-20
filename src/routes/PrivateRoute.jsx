import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

/** Wrap a route's element: renders children when signed in, else sends the
 *  visitor to /signin.  <Route path="/x" element={<PrivateRoute><X /></PrivateRoute>} /> */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) return <Navigate to="/signin" replace />;
  return children;
}

export default PrivateRoute;
