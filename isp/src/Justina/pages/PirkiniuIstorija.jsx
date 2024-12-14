import React from "react";
import ReactDOM from "react-dom/client";
import Bilietas from "../components/Bilietas.jsx"; // Ensure Ticket component is correctly imported
import ticketIcon from "../assets/bilietas.png"; // Example for image import
import seatIcon from "../assets/seat.png";
import '../styles/PirkiniuIstorija.css';
    const handleBackClick = () => {
      window.history.back(); // Go back to the previous page in the browser history
    };
const PirkiniuIstorija  = () => {
    
    return (
        <div style={{ padding: "20px" }}>
            <h1><center>2020-10-14 17:00</center></h1>
            <Bilietas
                icon={ticketIcon}
                movieName="Blue Eye Samurai"
                seatIcon={seatIcon}
                room="12 salė"
                seat="A5 vieta"
                price="15"
            />
                        <Bilietas
                icon={ticketIcon}
                movieName="Inside Out"
                seatIcon={seatIcon}
                room="10 salė"
                seat="B5 vieta"
                price="15"
            />
            <img 
        src="../assets/back.png" 
        alt="Back" 
        className="back-button" 
        onClick={handleBackClick} 
      />
        </div>
    );
};

export default PirkiniuIstorija;