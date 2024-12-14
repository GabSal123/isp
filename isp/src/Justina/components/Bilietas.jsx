import React from 'react';
import '../styles/PirkiniuIstorija.css';

const Bilietas = ({ icon, movieName, seatIcon, room, seat, price }) => {
    return (
        <div className="ticket">
            {/* Ticket Icon */}
            <div className="icon">
                <img src={icon} alt="Ticket Icon" />
            </div>

            {/* Movie Name */}
            <div className="movie-name">
                {movieName}
            </div>

            {/* Room and Seat */}
            <div className="details">
                <img src={seatIcon} alt="Seat Icon" className="seat-icon" />
                <span className="room">{room}</span>
                <span className="seat">{seat}</span>
            </div>

            {/* Price */}
            <div className="price">
                <span>{price}</span><span className="currency">€</span>
            </div>
        </div>
    );
};

export default Bilietas;
