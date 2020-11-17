import Information from "components/Information";
import React, { useState } from "react";
import style from "./style.module.scss";

interface IProps {
  registerCTA: string;
}

const Register = ({ registerCTA }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const openForm = () => {
    setOpen(true);
  };
  return (
    <div className={style.register}>
      {!open ? (
        <a className={style.btn} onClick={openForm}>
          {registerCTA}
        </a>
      ) : (
        <Information>
            SIGN UP SHEET
        </Information>
      )}
    </div>
  );
};

export default Register;
