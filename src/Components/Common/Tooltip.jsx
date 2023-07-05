import React, { useState } from 'react';
import './Tooltip.css'; // Import your CSS file for styling

const Tooltip = ({ text, children, tooltipStyle }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={"tooltip-bygpt"}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && 
        <span className={"tooltip-text"} style={tooltipStyle}>
          {text}
        </span>
      } 
    </div>
  );
};

export default Tooltip;
