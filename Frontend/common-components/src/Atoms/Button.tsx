import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ 
    label,
    onClick, 
  }) => { 
  return (
    <button 
      onClick={onClick}
      style={{
         backgroundColor: '#333'
      }}
    >
    {label}
    </button>
  );
}

export default Button;