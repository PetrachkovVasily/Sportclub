import React from "react";

interface Props {}

function Modal({ children, closeModal }) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-[8px] w-[400px] max-h-[90vh]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
