import React, { useState } from "react";
import "../css/alert/alertLayout.css";
import ModalContainer from "./modalContainer";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay ">
      <div className="modal ">
        {children}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
