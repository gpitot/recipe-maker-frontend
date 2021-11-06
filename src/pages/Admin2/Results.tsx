import React from "react";
import style from "./style.module.scss";

interface IProps {
  loading: boolean;
  columns: string[];
  rows: {
    [key: string]: any;
  }[][];
}

const Results = ({ columns, rows, loading }: IProps) => (
  <table className={style.results}>
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <p>Loading</p>
      ) : (
        rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {
              // @ts-ignore
              columns.map((column) => (
                <td>{row[column]}</td>
              ))
            }
          </tr>
        ))
      )}
    </tbody>
  </table>
);
export default Results;
