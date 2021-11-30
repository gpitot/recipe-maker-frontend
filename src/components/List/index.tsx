import Information from "components/Information";
import React from "react";
import style from "./style.module.scss";

interface IProps {
  headers: Array<any>;
  body: Array<Array<any>>;
  title?: string;
  columnsInBuilt?: boolean;
  headersInBuilt?: boolean;
}

const List = ({
  title,
  headers,
  body,
  columnsInBuilt,
  headersInBuilt,
}: IProps) => (
  <Information styles={style["table-outer"]}>
    {title && <h3>{title}</h3>}

    <div className={style.scrollerWrapper}>
      <div className={style.scroller}>
        <table>
          <thead>
            <tr>
              {headersInBuilt
                ? headers
                : headers.map((header) => (
                    <th key={header as string}>{header}</th>
                  ))}
            </tr>
          </thead>
          {body.length > 0 && (
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
          )}
        </table>
      </div>
    </div>
  </Information>
);

export default React.memo(List);
