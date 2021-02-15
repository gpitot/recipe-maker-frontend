import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  name: string;
  description: string;
  link: string;
}

const BoxLink = (details: IProps) => {
  const { description, id, name, link } = details;
  return (
    <Link
      to={{ pathname: `${link}/${id}`, state: details }}
      className={style.event}
      key={id}
    >
      <h2>{name}</h2>
      <h5>{description}</h5>
    </Link>
  );
};

export default BoxLink;
