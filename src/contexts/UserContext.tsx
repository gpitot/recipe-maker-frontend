import React, { createContext, useState } from "react";
import { IUser } from "rest/users";

const defaultUser = {
  email: "",
  firstname: "",
  lastname: "",
  role: "",
  photo: "",
} as IUser;

const defaultUserContext = {
  user: defaultUser,
  setUser: (_: IUser) => {},
};

const UserContext = createContext(defaultUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext };
export default UserProvider;
