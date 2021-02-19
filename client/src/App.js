import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BuyPage from "./components/BuyPage";
import SellPage from "./components/SellPage";
import NoMatch from "./components/NoMatch";
import AuthPage from "./components/AuthPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AuthPage />
        </Route>
        <Route path="/buy">
          <BuyPage />
        </Route>
        <Route path="/sell">
          <SellPage />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
