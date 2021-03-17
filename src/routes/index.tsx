import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Base from "components/Base";
import Home from "pages/Home";
import Social from "pages/Social";
import Competition from "pages/Competition";
import Ladder from "pages/Ladder";
import SubmitResults from "pages/SubmitResults";
import Event from "pages/Event";

import Shop from "pages/Shop";
import Coaching from "pages/Coaching";
import LoginError from "pages/LoginError";
import Login from "pages/Login";
import CreateUser from "pages/CreateUser";
import Profile from "pages/Profile";
import Admin from "pages/Admin";
import Notifications from "components/Notifications";

const Routes = () => (
  <Router>
    <Notifications />
    <Base>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/social">
          <Social />
        </Route>
        <Route path="/event/:eventid">
          <Event />
        </Route>
        <Route exact path="/competition">
          <Competition />
        </Route>

        <Route path="/competition/ladder/:ladderid">
          <Ladder />
        </Route>

        <Route path="/competition/submit">
          <SubmitResults />
        </Route>

        <Route path="/coaching">
          <Coaching />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>

        <Route path="/profile/:userid">
          <Profile />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/create">
          <CreateUser />
        </Route>

        <Route path="/loginerror">
          <LoginError />
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Base>
  </Router>
);

export default Routes;
