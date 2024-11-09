import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"

const ReservationForm = ()=> {
    const { id } = useParams();
    const reservation = {
        movie: "Titanikas",
        cost: 12

    }

    const navigate = useNavigate();



  return (

    <div className='resFormContainer'>
    <h1>Rezervacijos detales</h1>
    <p>Rezervacijos ID: {id}</p>
  </div>
  )
}

export default ReservationForm
