import React, { useState, useEffect } from "react";
import style from "./style.module.scss";

interface IProps {
  loading: boolean;
  columns: string[];
  rows: {
    [key: string]: any;
    isChecked: boolean;
  }[];
}

const Results = ({ columns, rows, loading }: IProps) => {
  const [currentRows, setCurrentRows] = useState(rows);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    setCurrentRows(rows);
  }, rows);

  const handleSelect = (idx: number) => {
    const current = [...currentRows];

    current[idx] = {
      ...current[idx],
      isChecked: !current[idx].isChecked,
    };
    setCurrentRows(current);
  };

  const handleToggleAll = () => {
    const current = [...currentRows].map((row) => ({
      ...row,
      isChecked: !allSelected,
    }));
    setCurrentRows(current);
    setAllSelected(!allSelected);
  };

  return (
    <table className={style.results}>
      <thead>
        <tr>
          <th onClick={handleToggleAll}>
            {allSelected ? "Deselect all" : "Select all"}
          </th>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td>Loading</td>
          </tr>
        ) : (
          currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type={"checkbox"}
                  checked={row.isChecked}
                  onChange={() => handleSelect(rowIndex)}
                />
              </td>
              {columns.map(
                (
                  column,
                  index // @ts-ignore
                ) => (
                  <td key={index}>{row[column]}</td>
                )
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
export default Results;
