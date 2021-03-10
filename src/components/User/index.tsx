import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames";
import { UserContext } from "contexts/UserContext";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import API from "rest/api";

interface IProps {
  headerScrolled?: boolean;
}

const User = ({ headerScrolled }: IProps) => {
  const { user, setUser } = useContext(UserContext);

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

  if (loading) return null;

  return (
    <div className={style.user}>
      {user.email ? (
        <span>{user.email}</span>
      ) : (
        <Link
          to="/create"
          className={classnames(
            style.book,
            headerScrolled && style["header-scrolled"]
          )}
        >
          CREATE ACCOUNT
        </Link>
      )}
    </div>
  );
};

export default User;
