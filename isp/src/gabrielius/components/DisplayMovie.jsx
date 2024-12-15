import React from 'react';
import '../styles/ReservationStyles.css';

const DisplayReservation = ({ name, onClickShow}) => {
  const image_name = `/src/movie_images/${name}.jpg`
  return (
    <div className="reservation-card">
      <div className="image-container" onClick={onClickShow}>
        <img src={image_name} width={100} height={150} alt="Movie" />
      </div>
      <p className="reservation-name">{name}</p>
    </div>
  );
};

export default DisplayReservation;