import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewOrder from "./containers/NewOrder";
import Orders from "./containers/Orders";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnAuthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/orders/new"
        exact
        component={NewOrder}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/orders/:id"
        exact
        component={Orders}
        appProps={appProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
