import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import Authed from "../Authed";
import CreateEventTemplateForm from "../events/CreateEventTemplateForm";
import ShowEventTemplates from "../events/ShowEventTemplates";
import SignInForm from "../account/SignInForm";
import SignupForm from "../account/SignUpForm";
import Home from "../common/Home";
import AdminHome from "../common/AdminHome";
import PrivateRoute from "./PrivateRoute";
import QualifyUserForm from "../users/QualifyUserForm";
import ScheduleEventTemplateForm from "../events/ScheduleEventTemplateForm";

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/users/qualify" element={<PrivateRoute><QualifyUserForm /></PrivateRoute>} />
      <Route path="/event-templates/create" element={<PrivateRoute><CreateEventTemplateForm /></PrivateRoute>} />
      <Route path="/event-templates/schedule" element={<PrivateRoute><ScheduleEventTemplateForm /></PrivateRoute>} />
      <Route path="/event-templates/view" element={<PrivateRoute><ShowEventTemplates /></PrivateRoute>} />
      <Route path="/authed" element={<PrivateRoute><Authed /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/home/admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </RouterRoutes>
  );
}

export default Routes;
