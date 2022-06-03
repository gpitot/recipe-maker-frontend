import AddButton from "components/AddButton";
import Input from "components/Input";
import List, { Row } from "components/List";
import React, { useState } from "react";
type Props = {
  id: string;
  label: string;
  items: Row[];
  columns: string[];
  handleAdd: (text: string) => void;
};

const ListItemWrapper = ({ id, label, items, handleAdd, columns }: Props) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const addItem = () => {
    handleAdd(query);
  };

  return (
    <>
      <List query={query} items={items} title={label} columns={columns} />
      <Input handleChange={handleChange} value={query} id={id} />
      <AddButton
        text="Add"
        handleClick={addItem}
        disabled={query.trim().length < 1}
      />
    </>
  );
};

export default ListItemWrapper;
