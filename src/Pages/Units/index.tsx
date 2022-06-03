import ListItemWrapper from "components/ListItemWrapper";
import React, { useEffect } from "react";
import { useStore } from "store";

const Units = () => {
  const [{ units }, { loadUnits, updateUnits }] = useStore();

  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  const handleAdd = (query: string) => {
    updateUnits(query);
  };

  const columns = ["Name"];
  const body = units.map((unit) => [{content : unit.name}]);

  return (
    <ListItemWrapper
      id="units"
      label="Units"
      items={body}
      handleAdd={handleAdd}
      columns={columns}
    />
  );
};

export default Units;
