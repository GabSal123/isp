import React from 'react';
import { useState } from 'react';
import '../styles/FilmStyles.css';

const DisplayFilm = ({date, comment, rating, movieTitle}) => {
    return (
        <div className='film-container'>
            <strong>Filmo pavadinimas</strong>
            <p className='film-p'>{movieTitle}</p>
            <strong>Filmo reitingas</strong>
            <p className='film-p'>{rating}</p>
            <strong>Peržiūrėjimo data</strong>
            <p className='film-p'>{date}</p>
            <strong>Komentaras</strong>
            <p className='film-p'>{comment}</p>          
        </div>
    )
}

export default DisplayFilm