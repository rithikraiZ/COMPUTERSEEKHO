import React from 'react';

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
