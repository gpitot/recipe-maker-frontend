import React, { useState } from "react";
import style from "./style.module.scss";
import classnames from "classnames";
import { ClassValue } from "classnames/types";
interface IProps {
  children: React.ReactNode;
  styles?: ClassValue;
  readMore?: boolean;
}
const Information = ({ children, styles, readMore = false }: IProps) => {
  //if no readmore is passed then start with expanded
  const [expanded, setExpanded] = useState(!readMore);

  const toggleExpand = () => {
    setExpanded((prevProps) => !prevProps);
  };

  const notExpanded = readMore && !expanded;

  return (
    <div className={classnames(style.block, styles)}>
      <div className={notExpanded && style.notExpanded}>{children}</div>

      {readMore && (
        <div className={style.expandBtn} onClick={toggleExpand}>
          {expanded ? "Show less" : "Read more"}
        </div>
      )}
    </div>
  );
};
export default Information;
