// import React, { Component } from 'react';
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { ModaOverlay, ModalWindow } from './Modal.styled'

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, children }) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);     
  // };

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', handleKeyDown); 
  // };


  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropDown = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
 
  return createPortal(
    <ModaOverlay onClick={handleBackdropDown}>
      <ModalWindow>
        {children}
      </ModalWindow>
    </ModaOverlay>,
    modalRoot
  );
  
}
export default Modal;

Modal.propTypes = {
      onClose: PropTypes.func.isRequired,
  };