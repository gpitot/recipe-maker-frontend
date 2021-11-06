import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import Results from "./Results";
import style from "./style.module.scss";
import Prebuilt from "./Prebuilt";

const Admin = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const getResults = (
    api: Function,
    params: any[] | object,
    columns: string[]
  ) => {
    setLoading(true);
    setColumns(columns);
    // @ts-ignore
    api
      .apply(params)
      .then((res) => {
        console.log(res);
        setRows(res.result);
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
