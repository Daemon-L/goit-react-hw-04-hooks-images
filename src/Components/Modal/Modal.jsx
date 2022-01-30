import React, { Component } from 'react';
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { ModaOverlay, ModalWindow } from './Modal.styled'

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);     
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); 
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropDown = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  static propTypes = {
      onClose: PropTypes.func.isRequired,
  };

  render() {  
    return createPortal(
      <ModaOverlay onClick={this.handleBackdropDown}>
        <ModalWindow>
          {this.props.children}
        </ModalWindow>
      </ModaOverlay>,
      modalRoot
    );
  }
}
export default Modal;