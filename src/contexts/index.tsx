import React from "react";
import Routes from "routes";
import UserProvider from "./UserContext";

import { StylesProvider } from "@material-ui/core/styles";
import { FlagsProvider } from "@atlaskit/flag";

const Contexts = () => (
  <UserProvider>
    <StylesProvider injectFirst>
      <FlagsProvider>
        <Routes />
      </FlagsProvider>
    </StylesProvider>
  </UserProvider>
);

export default Contexts;
