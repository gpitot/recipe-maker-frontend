import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import { ReactComponent as EditBtn } from "icons/elipsis.svg";
import style from "./style.module.scss";

interface IProps {
  children: (setOpen: (arg: boolean) => void) => React.ReactNode;
}

const Edit = ({ children }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  if (!open) return <EditBtn onClick={handleOpen} />;
  return <ul className={style.edit}>{children(setOpen)}</ul>;
};

export default AdminControl(Edit);
