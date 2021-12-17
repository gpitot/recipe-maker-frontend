import React from "react";
import Routes from "routes";
import UserProvider from "./UserContext";
import { FlagsProvider } from "@atlaskit/flag";

const Contexts = () => (
  <UserProvider>
    <FlagsProvider>
      <Routes />
    </FlagsProvider>
  </UserProvider>
);

export default Contexts;
