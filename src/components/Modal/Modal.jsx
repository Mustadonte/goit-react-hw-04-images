import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  z;
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDwon);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDwon);
  }

  handleKeyDwon = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
