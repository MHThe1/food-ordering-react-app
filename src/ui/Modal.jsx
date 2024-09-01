import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-black/50 p-6 max-w-md w-full rounded-lg shadow-xl bg-gray-800 text-white" onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}