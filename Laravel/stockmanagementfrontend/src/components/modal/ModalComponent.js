import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../app/modal.css';

const ModalComponent = ({ isOpen, onClose, children, title }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-0">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {title && <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>}
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalComponent;
