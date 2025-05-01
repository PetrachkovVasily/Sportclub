import React from "react";

interface Props {}

function RouteModal({ children, closeModal }) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[400px] max-h-[90vh] overflow-y-auto bg-[#d9d9d9] rounded-[8px] "
      >
        {children}
      </div>
    </div>
  );
}

export default RouteModal;
