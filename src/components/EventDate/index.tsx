import React from "react";
import classnames from "classnames";
import style from "./style.module.scss";

interface IProps {
  time: string;
  isLight?: boolean;
}

const EventDate = ({ time, isLight = false }: IProps) => {
  const date = new Date(parseInt(time));
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    <div className={classnames(style.date, isLight && style.light)}>
      {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
      {date.getHours()}:{minutes}
    </div>
  );
};

export default EventDate;
