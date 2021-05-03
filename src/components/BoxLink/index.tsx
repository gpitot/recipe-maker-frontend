import React from "react";
import style from "./style.module.scss";
import Information from "components/Information";
import Button from "components/Button";
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
      className={style["no-link"]}
    >
      <Information styles={style["table-outer"]}>
        <h3>{name}</h3>
        <h5>{description}</h5>
        <Button text={"Play now"} />
      </Information>
    </Link>
  );
};

export default BoxLink;
