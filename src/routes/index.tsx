import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Base from "components/Base";
import Home from "pages/Home";
import Social from "pages/Social";

const Routes = () => (
  <Router>
    <Base>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/social">
          <Social />
        </Route>
        <Route path="/social/:sport">
          <Social />
        </Route>
        <Route exact path="/competition" />
        <Route path="/competition/pennant" />
        <Route path="/competition/timed" />
        <Route path="/competition/ladder" />

        <Route path="/coaching" />
        <Route path="/shop" />
      </Switch>
    </Base>
  </Router>
);

export default Routes;
