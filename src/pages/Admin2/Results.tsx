import React, { useState, useEffect } from "react";
import List from "components/List";

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
  }, [rows]);

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

  if (currentRows.length === 0) return null;

  const headers = [
    <th onClick={handleToggleAll}>
      {allSelected ? "Deselect all" : "Select all"}
    </th>,
    ...columns.map((column) => <th key={column}>{column}</th>),
  ];

  const body = loading
    ? [[<td>Loading</td>]]
    : currentRows.map((row, rowIndex) => [
        <>
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
        </>,
      ]);

  return (
    <List
      title={"Results"}
      headers={headers}
      body={body}
      columnsInBuilt={true}
      headersInBuilt={true}
    />
  );
};
export default Results;
