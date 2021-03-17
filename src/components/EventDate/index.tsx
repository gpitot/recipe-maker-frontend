import React from "react";
import classnames from "classnames";
import style from "./style.module.scss";

interface IProps {
  time: string;
  isLight?: boolean;
  hasBorder?: boolean;
}

const EventDate = ({ time, isLight = false, hasBorder = false }: IProps) => {
  const date = new Date(parseInt(time));
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    <div
      className={classnames(
        style.date,
        isLight && style.light,
        hasBorder && style.hasBorder
      )}
    >
      {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
      {date.getHours()}:{minutes}
    </div>
  );
};

export default EventDate;
