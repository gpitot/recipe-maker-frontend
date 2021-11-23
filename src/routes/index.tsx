import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Base from "components/Base";
import Home from "pages/Home";
import Social from "pages/Social";
import Ladder from "pages/Ladder";
import Event from "pages/Event";

import Shop from "pages/Shop";
import Faq from "pages/FAQ";
import LoginError from "pages/LoginError";
import Login from "pages/Login";
import CreateUser from "pages/CreateUser";
import Profile from "pages/Profile";
import OldAdmin from "pages/Admin";
import Admin from "pages/Admin2";
import ResetPassword from "pages/ResetPassword";
import ForgotPassword from "pages/ForgotPassword";

const Routes = () => (
  <Router>
    <Switch>
      <Base>
        <Route path="/admin">
          <>
            <Admin />
            <OldAdmin />
          </>
        </Route>
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
          <Redirect to={"/competition/ladder/1"} />
        </Route>

        <Route path="/competition/ladder/:ladderid">
          <Ladder />
        </Route>

        <Route path="/faq">
          <Faq />
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

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/loginerror">
          <LoginError />
        </Route>

        <Route path="/reset-password">
          <ResetPassword />
        </Route>
      </Base>
    </Switch>
  </Router>
);

export default Routes;
