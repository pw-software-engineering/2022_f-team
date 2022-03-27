import React from "react";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ 
    onClick, 
    children,
  }) => { 
  return (
    <button 
      onClick={onClick}
      style={{
         backgroundColor: '#333'
      }}
    >
    {children}
    </button>
  );
}

export default Button;