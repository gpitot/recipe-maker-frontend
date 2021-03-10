import React, { useState, useContext } from "react";
import API from "rest/api";
import { IRanks } from "rest/ladder";
import { toast } from "react-toastify";
import { UserContext } from "contexts/UserContext";
import Button from "components/Button";
import style from "./style.module.scss";

interface IProps {
  players: Array<IRanks>;
  ladder_id: number;
}

const Signup = ({ players, ladder_id }: IProps) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    API.ladder
      .signUp({ ladder_id })
      .then(({ success }) => {
        if (success) {
          toast.success("Signed up to ladder");
        } else {
          toast.error("Could not sign up");
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
