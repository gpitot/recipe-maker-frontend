import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
import API from "rest/api";
import { UserContext } from "contexts/UserContext";
import style from "./style.module.scss";

interface IProps {
  headerScrolled?: boolean;
}

const User = ({ headerScrolled }: IProps) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    API.users
      .getUser()
      .then((res) => {
        if (res.success) {
          setUser(res.user);
        }
      })
      .finally(() => setLoading(false));
  }, [setUser]);

  if (loading) return null;

  return (
    <div className={style.user}>
      {user.id ? (
        <img src={user.photo} alt="" />
      ) : (
        <a
          href={`${process.env.REACT_APP_API_URL}/auth/login/google`}
          className={classnames(
            style.book,
            headerScrolled && style["header-scrolled"]
          )}
        >
          LOGIN
        </a>
      )}
    </div>
  );
};

export default User;
