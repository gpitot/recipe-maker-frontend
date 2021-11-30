import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import Results from "./Results";
import Prebuilt from "./Prebuilt";
import GroupMessage from "./group-message";
import Information from "components/Information";

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
    <Information>
      <Prebuilt onGeneration={getResults} />
      <Results columns={columns} rows={rows} loading={loading} />
      <GroupMessage />
    </Information>
  );
};

export default AdminControl(Admin);
