import React from "react";
import Register from "components/Register";
import List from "components/List";

const SocialRacquetball = () => (
  <>
    <Register registerCTA={"SIGN UP FOR RACQUETBALL"} />
    <List headers={["Session 1. 20:00-22:00"]} body={[["Guillaume"]]} />
  </>
);

export default SocialRacquetball;
