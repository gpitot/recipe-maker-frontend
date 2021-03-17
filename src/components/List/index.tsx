import Information from "components/Information";
import React from "react";
import style from "./style.module.scss";

interface IProps {
  headers: Array<string>;
  body: Array<Array<any>>;
  title?: string;
  columnsInBuilt?: boolean;
}

const List = ({ title, headers, body, columnsInBuilt }: IProps) => (
  <Information styles={style["table-outer"]}>
    {title && <h3>{title}</h3>}

    <div className={style.scrollerWrapper}>
      <div className={style.scroller}>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, idx) => {
              if (columnsInBuilt) {
                return <tr key={idx}>{row}</tr>;
              }
              return (
                <tr key={idx}>
                  {row.map((col, idx) => (
                    <td key={idx}>{col}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </Information>
);

export default React.memo(List);
