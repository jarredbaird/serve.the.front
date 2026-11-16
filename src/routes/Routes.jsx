import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
    <Switch>
      <PrivateRoute exact path="/users/qualify">
        <QualifyUserForm />
      </PrivateRoute>
      <PrivateRoute exact path="/event-templates/create">
        <CreateEventTemplateForm />
      </PrivateRoute>
      <PrivateRoute exact path="/event-templates/schedule">
        <ScheduleEventTemplateForm />
      </PrivateRoute>
      <PrivateRoute exact path="/event-templates/view">
        <ShowEventTemplates />
      </PrivateRoute>
      <PrivateRoute exact path="/authed">
        <Authed />
      </PrivateRoute>
      <PrivateRoute exact path="/home">
        <Home />
      </PrivateRoute>
      <PrivateRoute exact path="/home/admin">
        <AdminHome />
      </PrivateRoute>
      <Route exact path="/signin">
        <SignInForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
