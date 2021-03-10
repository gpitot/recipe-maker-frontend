import React, { useContext } from "react";
import classnames from "classnames";
import { UserContext } from "contexts/UserContext";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  headerScrolled?: boolean;
}

const User = ({ headerScrolled }: IProps) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  return (
    <div className={style.user}>
      {user.id ? (
        <Link
          to={`/profile/${user.id}`}
          className={classnames(
            style.book,
            style.inner,
            headerScrolled && style["header-scrolled"]
          )}
        >
          PROFILE
        </Link>
      ) : (
        <Link
          to="/login"
          className={classnames(
            style.book,
            headerScrolled && style["header-scrolled"]
          )}
        >
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default User;
