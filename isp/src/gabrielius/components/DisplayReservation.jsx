import React from 'react';
import '../styles/ReservationStyles.css';

const DisplayReservation = ({ name, cost, date, onClickShow, onClickEdit, onClickDelete }) => {
  const image_name = `/src/movie_images/${name}.jpg`
  return (
    <div className="reservation-card">
      <div className="image-container" onClick={onClickShow}>
        <img src={image_name} width={100} height={150} alt="Movie" />
      </div>
      <p>{new Date(date).toLocaleDateString()}</p>
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