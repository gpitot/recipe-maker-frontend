import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const Nav = () => (
  <nav className={style.nav}>
    <Link to="/units">Units</Link>
    <Link to="/ingredients">Ingredients</Link>
    <Link to="/recipes">Recipes</Link>
  </nav>
);

export default Nav;
