import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
};

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${variant === 'primary' ? 'bg-blue-500 text-white' : variant === 'secondary' ? 'bg-gray-200 text-gray-800' : 'border border-gray-300 bg-transparent'}`}
    >
      {children}
    </button>
  );
};
