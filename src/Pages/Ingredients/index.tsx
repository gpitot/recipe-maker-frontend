import Select from "components/Select";
import ListItemWrapper from "components/ListItemWrapper";
import React, { useEffect, useState } from "react";
import { useStore } from "store";
import AddButton from "components/AddButton";

const Ingredients = () => {
  const [name, setName] = useState("");
  const [unitsVisible, setUnitsVisible] = useState(false);
  const [unitSelected, setUnitSelected] = useState<string | undefined>(
    undefined
  );
  const [
    { ingredients, units },
    { loadIngredients, loadUnits, updateIngredients },
  ] = useStore();

  useEffect(() => {
    loadIngredients();
    loadUnits();
  }, [loadIngredients, loadUnits]);

  const handleAdd = (query: string) => {
    setName(query);
    setUnitsVisible(true);
  };

  const handleChange = (e: any) => {
    setUnitSelected(e.target.value);
  };

  const handleRealAdd = () => {
    updateIngredients(name, unitSelected!);
  };

  if (unitsVisible) {
    const options: {
      text: string;
      value?: string;
    }[] = units.map((unit) => ({
      text: unit.name,
      value: unit.name,
    }));

    options.unshift({
      text: "Add a unit",
      value: "null",
    });

    return (
      <>
        <Select
          handleChange={handleChange}
          options={options}
          value={unitSelected}
        />

        <AddButton
          text="Add"
          disabled={unitSelected === "null"}
          handleClick={handleRealAdd}
        />
      </>
    );
  }

  const columns = ["Name", "Unit"];
  const body = ingredients.map((item) => [{content : item.name}, {content: item.unit}]);

  return (
    <ListItemWrapper
      id="ingredients"
      label="Ingredients"
      items={body}
      handleAdd={handleAdd}
      columns={columns}
    />
  );
};

export default Ingredients;
