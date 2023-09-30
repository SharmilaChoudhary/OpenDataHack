import React from 'react';

const Button: React.FC<{
  children: React.ReactElement | string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 px-3 py-3 rounded-lg mr-2 my-2 text-white ${
        disabled ? 'opacity-50' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
