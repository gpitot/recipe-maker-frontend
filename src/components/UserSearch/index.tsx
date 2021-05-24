import React, { useState, useMemo, useCallback } from "react";
import AdminControl from "components/AdminControl";
import Input from "components/Input";
import { ISearchUser } from "rest/users";
import API from "rest/api";
import debounce from "lodash.debounce";
import style from "./style.module.scss";

interface IProps {
  onSelect: (user: ISearchUser) => void;
}

const UserSearch = ({ onSelect }: IProps) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState<Array<ISearchUser>>([]);
  const [selected, setSelected] = useState<ISearchUser>();

  const handleSearch = useCallback((value: string) => {
    API.users.search(value).then((res) => {
      if (res.success) {
        setUsers(res.result);
      }
    });
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        handleSearch(val);
      }, 250),
    [handleSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);

      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleSelect = (user: ISearchUser) => {
    setSelected(user);
    onSelect(user);
  };

  const removeSelected = () => {
    setSelected(undefined);
    setText("");
    setUsers([]);
  };

  if (selected) {
    return (
      <div className={style.area}>
        <div className={style.options}>
          <div className={style.option} onClick={removeSelected}>
            {selected.firstname} {selected.lastname}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.area}>
      <Input
        label="Search for user"
        value={text}
        handleChange={handleChange}
        name="query"
        type="text"
      />
      {users.length > 0 && (
        <div className={style.options}>
          {users.map((user) => (
            <div className={style.option} onClick={() => handleSelect(user)}>
              {user.firstname} {user.lastname}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminControl(UserSearch);
