import React from 'react';
import '../styles/ReservationStyles.css';

const DisplayReservation = ({ name, cost, onClickShow, onClickEdit, onClickDelete }) => {
  return (
    <div className="reservation-card">
      <div className="image-container" onClick={onClickShow}>
        <img src="https://via.placeholder.com/100x150" alt="Movie" />
      </div>
      <p className="reservation-name">{name}</p>
      <p className="reservation-cost">Cost: ${cost}</p>
      <div className="button-container">
        <button className="edit-button" onClick={onClickEdit}>Pakeisti</button>
        <button className="delete-button" onClick={onClickDelete}>Trinti</button>
      </div>
    </div>
  );
};

export default DisplayReservation;