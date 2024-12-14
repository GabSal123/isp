import React from "react";
import Counter from "../components/Counter.jsx";
import Back from '../assets/back.png';
import Add from '../assets/Add.png';
import Pop from '../assets/Popcorn.png';

const handleBackClick = () => {
    window.history.back(); // Go back to the previous page in the browser history
};

const PrekesLangas = () => {
  return (
    <div class="prekes-body">
     <img 
        src={Pop} 
        alt="Popcorn" // Changed alt text for clarity
        className="popcorn-image" // Optional: add a class for styling
      />
    <div className="flex-container">
      <img 
        src={Back}
        alt="Back" 
        className="back-button" 
        onClick={handleBackClick} 
      />
      <div className="counter">
        <Counter />
      </div>
      <img 
        src={Add}
        alt="Add" 
        className="add-button" 
      />
    </div>
    </div>
  );
};

export default PrekesLangas;
