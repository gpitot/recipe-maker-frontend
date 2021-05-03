import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import { ReactComponent as EditBtn } from "icons/elipsis.svg";
import style from "./style.module.scss";
import Modal from "components/Modal";

interface IProps {
  children: (setOpen: (arg: boolean) => void) => React.ReactNode;
}

const Edit = ({ children }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  if (!open) return <EditBtn onClick={handleOpen} />;
  return (
    <Modal setOpen={setOpen}>
      <ul className={style.edit}>{children(setOpen)}</ul>
    </Modal>
  );
};

export default AdminControl(Edit);
