import React, { useState } from "react";
import Button from "components/Button";
import API from "rest/api";
import AdminControl from "components/AdminControl";
import style from "./style.module.scss";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import UserSearch from "components/UserSearch";
import { ISearchUser } from "rest/users";

const GeneratePasswordReset = () => {
  const [user, setUser] = useState<ISearchUser>();
  const [token, setToken] = useState("");

  const { showFlag } = useFlags();

  const handleClick = () => {
    if (!user) return;
    API.users
      .adminGenerateReset({
        user_id: user.id,
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

  const handleSelect = (user: ISearchUser) => {
    setUser(user);
  };

  return (
    <div className={style.area}>
      <UserSearch onSelect={handleSelect} />
      {token && (
        <div>https://northmanlysquash.com/reset-password?token={token}</div>
      )}
      <Button text="Generate token" handleClick={handleClick} />
    </div>
  );
};

export default AdminControl(GeneratePasswordReset);
