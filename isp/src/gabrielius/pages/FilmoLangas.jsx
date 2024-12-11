import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import SeatSelection from '../components/SeatSelection';

const FilmoLangas = ()=> {
    const { id } = useParams();
    const reservation = {
        movie: "Titanikas",
        cost: 12

    }

    const navigate = useNavigate();
    const handleResClick = () => {
        console.log(id)
        navigate(`/seansai/${id}`);
    };


  return (
<div className="FilmPageContainer">
  <h1>{reservation.movie} {id}</h1>
  <div className='FilmPageContainer2'><img src="your-image-url-here" alt="Movie" /></div>
  <button onClick={handleResClick}>Uzsisakyti</button>
</div>
  )
}

export default FilmoLangas
