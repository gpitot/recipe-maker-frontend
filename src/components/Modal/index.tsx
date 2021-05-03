import React from "react";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
const modalRoot = document.getElementById("modal") as HTMLElement;

interface IProps {
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
}

const Modal = (props: IProps) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return ReactDOM.createPortal(
    <div className={style.modalOuter}>
      <div className={style.modal}>
        <button className={style.close} onClick={handleClose}></button>
        {props.children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
