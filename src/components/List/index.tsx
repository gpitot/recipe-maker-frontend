import React, { ReactNode } from "react";
import style from "./style.module.scss";


export type Row = {
  content : string;
  element? : ReactNode;
}[]

type Props = {
  query: string;
  items: Row[];
  title: string;
  columns: string[];
};

const isVisible = (row: Row, query: string) => {
  return row.find((item) => item.content.includes(query)) !== undefined;
};

const List = ({ title, query, items, columns }: Props) => (
  <>
    <h2>{title}</h2>
    <table className={style.list}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items
          .filter((row) => isVisible(row, query))
          .map((row) => (
            <tr>
              {row.map((item) => (
                <td key={item.content}>{item.element || item.content}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  </>
);

export default List;
