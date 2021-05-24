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

const ManualRegistration = ({ event_id }: { event_id: number }) => {
  const [user, setUser] = useState<ISearchUser>();

  const { showFlag } = useFlags();

  const handleClick = () => {
    if (!user) return;
    API.userEvents
      .addUserEventManually({
        event_id,
        user_id: user.id,
      })
      .then((res) => {
        if (res.success) {
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

  const handleSelect = (user: ISearchUser) => {
    setUser(user);
  };

  return (
    <div className={style.area}>
      <UserSearch onSelect={handleSelect} />
      <Button text="Register user" handleClick={handleClick} />
    </div>
  );
};

export default AdminControl(ManualRegistration);
