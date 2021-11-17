import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import Results from "./Results";
import style from "./style.module.scss";
import Prebuilt from "./Prebuilt";

const Admin = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const getResults = (api: Function, params: any[], columns: string[]) => {
    setLoading(true);
    setColumns(columns);
    api(...params)
      // @ts-ignore
      .then((res) => {
        // @ts-ignore
        const rows = res.result.map((row) => ({
          ...row,
          isChecked: false,
        }));

        setRows(rows);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={style.admin}>
      <div className={style.inner}>
        <Prebuilt onGeneration={getResults} />
        <Results columns={columns} rows={rows} loading={loading} />
      </div>
    </div>
  );
};

export default AdminControl(Admin);
