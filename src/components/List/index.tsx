import Information from "components/Information";
import React from "react";
import style from "./style.module.scss";

interface IProps {
  headers: Array<string>;
  body: Array<Array<any>>;
}

const List = ({ headers, body }: IProps) => (
  <Information styles={style["table-outer"]}>
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, idx) => (
          <tr key={idx}>
            {row.map((col, idx) => (
              <td key={idx}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Information>
);

export default React.memo(List);
