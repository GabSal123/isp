import React from "react";
import ReactDOM from "react-dom/client";
import Bilietas from "../components/Bilietas.jsx"; // Ensure Ticket component is correctly imported
import ticketIcon from "../assets/bilietas.png"; // Example for image import
import seatIcon from "../assets/seat.png";
import '../styles/PirkiniuIstorija.css';
import Back from '../assets/back.png';
import Remove from '../assets/remove.png';
import Payment from '../assets/payment.png';
import History from '../assets/history.png';

    const handleBackClick = () => {
      window.history.back(); // Go back to the previous page in the browser history
    };

const KrepselioLangas  = () => {
    
    return (
        <div class="pirkiniu-body">
            <h1><center>Krepšelis</center></h1>
            <div class="flex-container">
                <Bilietas
                icon={ticketIcon}
                movieName="Blue Eye Samurai"
                seatIcon={seatIcon}
                room="12 salė"
                seat="A5 vieta"
                price="15"
            />
                        <img 
        src={Remove}
        alt="Remove" 
        className="remove-button" 
        //onClick={handleBackClick} 
      /></div>
       <div class="flex-container">
                        <Bilietas
                icon={ticketIcon}
                movieName="Inside Out"
                seatIcon={seatIcon}
                room="10 salė"
                seat="B5 vieta"
                price="15"
            />
                                    <img 
        src={Remove}
        alt="Remove" 
        className="remove-button" 
        //onClick={handleBackClick} 
      />
      </div>
      <div class="flex-container">
            <img 
        src={Back}
        alt="Back" 
        className="back-button" 
        onClick={handleBackClick} 
      />
            <img 
        src={Payment}
        alt="payment" 
        className="back-button" 
       // onClick={handleBackClick} 
      />
            <img 
        src={History}
        alt="history" 
        className="back-button" 
       // onClick={handleBackClick} 
      />
      </div>
      </div>
    );
};

export default KrepselioLangas;