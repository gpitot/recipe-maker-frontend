import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const Header = () => {
  const [dropdownShown, setDropdownShown] = useState(false);

  const toggleHeader = () => {
    setDropdownShown(!dropdownShown);
  };

  return (
    <section className={style.header}>
      <div className={style.inner}>
        <div className={style["item-container"]}>
          <Link to="/">
            <img src="/logo-black.png" />
          </Link>
        </div>
        <div className={style["items-container"]}>
          <div className={classnames(style.items, dropdownShown && style.open)}>
            <Link to="/social">SOCIAL</Link>
            <Link to="/competition">COMPETITION</Link>
            <Link to="/coaching">COACHING</Link>
            <Link to="/shop">SHOP</Link>
          </div>
        </div>
        <div className={style["item-container"]}>
          <button
            onClick={toggleHeader}
            className={style["mobile-dropdown"]}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default Header;
