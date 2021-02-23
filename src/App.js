import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BuyPage from "./components/BuyPage";
import SellPage from "./components/SellPage";
import NoMatch from "./components/NoMatch";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <AuthPage />
        </ProtectedRoute>
        <ProtectedRoute path="/buy">
          <BuyPage />
        </ProtectedRoute>
        <ProtectedRoute path="/sell">
          <SellPage />
        </ProtectedRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
