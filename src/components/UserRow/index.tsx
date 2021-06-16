import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
interface IProps {
  id: number;
  name: string;
  photo?: string;
}

const UserRow = ({ id, name, photo }: IProps) => (
  <Link to={`/profile/${id}`} className={style.user}>
    <span>{name}</span>
  </Link>
);

export default UserRow;
