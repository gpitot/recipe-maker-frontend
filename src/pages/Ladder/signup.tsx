import React, { useState, useContext } from "react";
import API from "rest/api";
import { IRanks } from "rest/ladder";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { UserContext } from "contexts/UserContext";
import Button from "components/Button";
import style from "./style.module.scss";

interface IProps {
  players: Array<IRanks>;
  ladder_id: number;
}

const Signup = ({ players, ladder_id }: IProps) => {
  const { showFlag } = useFlags();

  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    API.ladder
      .signUp({ ladder_id })
      .then(({ success }) => {
        if (success) {
          showFlag({
            title: "Signed up to ladder",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
        } else {
          showFlag({
            title: "Could not sign up to ladder",
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isAlreadySigned = () => {
    if (!user.id) return false;
    for (let i = 0; i < players.length; i += 1) {
      const p = players[i];
      if (p.id === user.id) return true;
    }
    return false;
  };
  if (isAlreadySigned()) return null;

  if (loading) return null;
  return (
    <div className={style.signup}>
      <Button handleClick={handleSignUp} text={"Sign up"} />
    </div>
  );
};

export default Signup;
