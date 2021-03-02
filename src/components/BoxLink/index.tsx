import React from "react";
import style from "./style.module.scss";
import Information from "components/Information";
import Button from "components/Button";
import { useHistory } from "react-router-dom";

interface IProps {
  id: number;
  name: string;
  description: string;
  link: string;
}

const BoxLink = (details: IProps) => {
  const { description, id, name, link } = details;
  const history = useHistory();
  const handlePlay = () => {
    history.push(`${link}/${id}`, details);
  };

  return (
    <Information styles={style["table-outer"]}>
      <h3>{name}</h3>
      <h5>{description}</h5>
      <Button text={"Play now"} handleClick={handlePlay} />
    </Information>
  );
};

export default BoxLink;
