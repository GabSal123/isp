import React from "react";
import CupImage from '../assets/Cup.png'; // Path to your cup image
import Pop from '../assets/Popcorn.png'; // Path to your uploaded image
import Cola from '../assets/Cola.png'; // Path to your uploaded image
import Pepsi from '../assets/Pepsi.png';
import '../styles/PrekiuSarasas.css'; // Make sure to import your CSS
import Back from '../assets/back.png';
import Cart from '../assets/Cart.png';
import Dropdown from "../components/Dropdown.jsx"; // Adjust the path as necessary
const handleBackClick = () => {
    window.history.back(); // Go back to the previous page in the browser history
};
const PrekiuSarasas = () => {
    return (
        <div>
            <div class="flex-container">
                <Dropdown />
                <img
                    src={Cart}
                    alt="Cart"
                    className="back-button"
                //onClick={handleBackClick} 
                />
            </div>
            <div class="flex-container">
                <div className="cup">
                    <div className="cup-image" style={{ backgroundImage: `url(${Pop})` }}></div>
                </div>
                <div className="cup">
                    <div className="cup-image" style={{ backgroundImage: `url(${Cola})` }}></div>
                </div>
                <div className="cup">
                    <div className="cup-image" style={{ backgroundImage: `url(${Pepsi})` }}></div>
                </div>
            </div>
            <img
                src={Back}
                alt="Back"
                className="back-button"
                onClick={handleBackClick}
            />
        </div>
    );
};

export default PrekiuSarasas;