import React, { useState } from "react";
import "../styles/PrekesLangas.css"; // Import the CSS file

const Counter = () => {
    // State for the counter value
    const [count, setCount] = useState(1);
  
    // Event Handlers
    const increment = () => setCount(count + 1);
  
    const decrement = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
  
    return (
      <div className="counter-container">
        <button className="counter-btn" onClick={decrement}>
          −
        </button>
        <span className="counter-value">{count}</span>
        <button className="counter-btn" onClick={increment}>
          +
        </button>
      </div>
    );
  };
  
  export default Counter;
