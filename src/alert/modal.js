import React, { useState } from 'react';
import "../css/alert/alertLayout.css";
import ModalContainer from './modalContainer';

function Modal(props) {
    return (
        <ModalContainer>
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
            {props.children}
            </div>
        </div>
        </div>
        </ModalContainer>

    );
}

export default Modal;
