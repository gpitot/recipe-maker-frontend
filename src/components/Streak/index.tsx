import React from "react";
import style from "./style.module.scss";
import classnames from "classnames";

const Streak = ({ streak = 0 }: { streak: number }) => {
  const streakStyle = streak < 12 ? style[`s-${streak}`] : style[`s-12`];
  return <div className={classnames(style.streak, streakStyle)}>{streak}</div>;
};

export default Streak;
