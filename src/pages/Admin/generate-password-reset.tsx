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

const GeneratePasswordReset = () => {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  const { showFlag } = useFlags();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleClick = () => {
    const id = parseInt(text);

    API.users
      .generateReset({
        user_id: id,
      })
      .then((res) => {
        if (res.success) {
          setToken(res.result.token);
          showFlag({
            isAutoDismiss: true,
            title: "Generated token",
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
          title: "Could not generate token",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,
          appearance: "error",
        });
      });
  };

  return (
    <div className={style.area}>
      <Input
        label="Generate reset password link for User ID"
        value={text}
        handleChange={handleChange}
        name="userID"
        type="text"
      />
      <div>https://northmanlysquash.com/reset-password?token={token}</div>
      <Button text="Generate" handleClick={handleClick} />
      
    </div>
  );
};

export default AdminControl(GeneratePasswordReset);
