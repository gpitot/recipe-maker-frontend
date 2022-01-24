import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import BaseView from "components/BaseView";

const Routes = () => (
  <Router>
    <Switch>
        <BaseView>

        </BaseView>
    </Switch>
  </Router>
);

export default Routes;
