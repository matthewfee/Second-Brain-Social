/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createPortal } from 'react-dom';

export const Modal = ({ children, closeModal }) => {
  // if (!isOpen) return null;
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <>
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.7)]"
        onClick={() => closeModal()}
        onKeyDown={() => handleKeyDown()}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      />
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{children}</div>
    </>,
    document.getElementById('modal_portal')
  );
};
