import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import SeatSelection from '../components/SeatSelection';
import axios from 'axios';

const RezervacijosKurimoLangas = ()=> {
    const { id } = useParams();
    const [movie, setMovie] = useState({title:""})

    const navigate = useNavigate();
    const handleResClick = () => {
      console.log(id)
      navigate(`/revervacija/${id}`);
  };
  useEffect(()=>{
    const request = axios.get(`https://localhost:7241/GetMovieFromSession?sessionId=${id}`).then((res) => res.data)
  .then((data) => {
    setMovie(data)
  })
  .catch((e) => {
    console.log(e)
  });
 },[])

  return (

    <div className='resFormContainer'>
    <h1>Rezervacijos detales</h1>
    <p>{movie.title}</p>
    <SeatSelection session_id={id}/>
    <button onClick={handleResClick}>Uzsisakyti</button>
  </div>
  )
}

export default RezervacijosKurimoLangas
