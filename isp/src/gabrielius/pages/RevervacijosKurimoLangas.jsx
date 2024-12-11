import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import SeatSelection from '../components/SeatSelection';

const RezervacijosKurimoLangas = ()=> {
    const { id } = useParams();
    const reservation = {
        movie: "Titanikas",
        cost: 12

    }

    const navigate = useNavigate();
    const handleResClick = () => {
      console.log(id)
      navigate(`/revervacija/${id}`);
  };


  return (

    <div className='resFormContainer'>
    <h1>Rezervacijos detales</h1>
    <p>Rezervacijos ID: {id}</p>
    <p>{reservation.movie}</p>
    <SeatSelection/>
    <button onClick={handleResClick}>Uzsisakyti</button>
  </div>
  )
}

export default RezervacijosKurimoLangas
