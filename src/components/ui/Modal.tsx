import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {children}
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
