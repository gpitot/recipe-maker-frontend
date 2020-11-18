import React from "react";
import Register from "components/Register";
import List from "components/List";

const SocialSquash = () => (
  <>
    <Register registerCTA={"SIGN UP FOR SQUASH"} />
    <List headers={["Coaching. 18:00-19:00"]} body={[["Guillaume"]]} />
    <List headers={["Session 1. 19:00-20:30"]} body={[["Guillaume"]]} />
    <List headers={["Session 3. 20:30-22:00"]} body={[["Guillaume"]]} />
  </>
);

export default SocialSquash;
