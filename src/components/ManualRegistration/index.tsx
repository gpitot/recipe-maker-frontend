import React, { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import API from "rest/api";
import AdminControl from "components/AdminControl";
import style from "./style.module.scss";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

const ManualRegistration = ({ event_id }: { event_id: number }) => {
  const [text, setText] = useState("");

  const { showFlag } = useFlags();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleClick = () => {
    const id = parseInt(text);

    API.userEvents
      .addUserEventManually({
        event_id,
        user_id: id,
      })
      .then((res) => {
        if (res.success) {
          setText("");
          showFlag({
            isAutoDismiss: true,
            title: "Added user to event",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
          return;
        }
        throw Error;
      })
      .catch(() => {
        showFlag({
          isAutoDismiss: true,
          title: "Could not add user to event",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,
          appearance: "error",
        });
      });
  };

  return (
    <div className={style.area}>
      <Input
        label="Register User ID"
        value={text}
        handleChange={handleChange}
        name="userID"
        type="text"
      />
      <Button text="Register user" handleClick={handleClick} />
    </div>
  );
};

export default AdminControl(ManualRegistration);
