import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeWindowEsc);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', closeWindowEsc);
    };
  }, []);
  const closeWindowEsc = ev => {
    if (ev.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
