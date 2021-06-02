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
    const updateStreak = (currentUser: IUser) => {
      API.users.getMyStreak().then((res) => {
        if (res.success) {
          setUser({
            ...currentUser,
            streak: res.result.streak,
          });
        }
      });
    };
    API.users
      .me()
      .then((res) => {
        if (res.success) {
          setUser(res.user);

          //update user streak
          updateStreak(res.user);
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
