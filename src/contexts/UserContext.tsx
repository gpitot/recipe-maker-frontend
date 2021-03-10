import React, { createContext, useState, useEffect } from "react";
import { IUser } from "rest/users";
import API from "rest/api";

const defaultUser = {
  id: 0,
  firstname: "",
  lastname: "",
  role: "",
  photo: "",
  accessToken: "",
} as IUser;

const defaultUserContext = {
  user: defaultUser,
  setUser: (_: IUser) => {},
  loading: true,
};

const UserContext = createContext(defaultUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.users
      .me()
      .then((res) => {
        if (res.success) {
          setUser(res.user);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext };
export default UserProvider;
