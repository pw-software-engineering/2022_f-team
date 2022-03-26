import React from 'react';

const Button = ({
  onClick,
  children
}) => {
  return React.createElement("button", {
    onClick: onClick,
    style: {
      backgroundColor: '#333'
    }
  }, children);
};

export { Button };
//# sourceMappingURL=index.modern.js.map
