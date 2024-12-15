import React, { useEffect, useState } from "react";
import "../styles/PrekesLangas.css"; // Import the CSS file

const Counter = ({ amountLeft}) => {
    const [quantity, setQuantity] = useState(1); // Default quantity to 1
  // Event Handlers for increment and decrement
  const increment = () => {
    if (quantity < amountLeft) {
      setQuantity(quantity+1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Safely update state
    }
  };

  return (
    <div className="counter-container">
      <button 
        className="counter-btn" 
        onClick={decrement} 
        disabled={quantity <= 1} // Disable if quantity is at minimum
      >
        −
      </button>
      <span className="counter-value">{quantity}</span>
      <button 
        className="counter-btn" 
        onClick={increment} 
        disabled={quantity >= amountLeft} // Disable if quantity reaches max
      >
        +
      </button>
    </div>
  );
};

export default Counter;
