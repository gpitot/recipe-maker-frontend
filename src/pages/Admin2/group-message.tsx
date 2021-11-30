import React from "react";
import { MessageKeyList } from "./available-apis";
import Button from "components/Button";
import style from "./style.module.scss";

const GroupMessage = () => {
  return (
    <div className={style.form}>
      <select>
        {MessageKeyList.map((message) => (
          <option key={message} value={message}>
            {message}
          </option>
        ))}
      </select>
      <Button text={"Send group message"} />
    </div>
  );
};
export default GroupMessage;
