import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import BaseView from "components/BaseView";
import Units from "Pages/Units";
import Ingredients from "Pages/Ingredients";
import Recipes from "Pages/Recipes";
import SingleRecipe from "Pages/EditRecipe";
import Home from "Pages/Home";

const Routes = () => (
  <Router>
    <Switch>
      <BaseView>
        
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/units">
          <Units />
        </Route>

        <Route path="/ingredients">
          <Ingredients />
        </Route>

        <Route exact path="/recipes">
          <Recipes />
        </Route>

        <Route path="/recipes/:id">
          <SingleRecipe />
        </Route>
      </BaseView>
    </Switch>
  </Router>
);

export default Routes;
