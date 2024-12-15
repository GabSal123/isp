import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import SeatSelection from '../components/SeatSelection';
import axios from 'axios';

const FilmoLangas = ()=> {
    const { id } = useParams();

    const [movie, setMovie] = useState({title:""})
    const [movieImage, setMovieImage] = useState("")

    useEffect(()=>{
      const request = axios.get(`https://localhost:7241/GetMovie?id=${id}`).then((res) => res.data)
    .then((data) => {
      setMovie(data)
      const movie_image = `/src/movie_images/${data.title}.jpg`
      setMovieImage(movie_image)
    })
    .catch((e) => {
      console.log(e)
    });
   },[])

    const navigate = useNavigate();
    const handleResClick = () => {
        console.log(id)
        navigate(`/seansai/${id}`);
    };


  return (
<div className="FilmPageContainer">
  <h1>{ movie.title}</h1>
  <div className='FilmPageContainer2'><img src={movieImage} alt="Movie" /></div>
  <p className="reservation-name">Aprasymas: {movie.description}</p>
  <p className="reservation-name">Rodo nuo: {movie.startingFrom}   Iki: {movie.showingUntil}  </p>
  <p className="reservation-name">Trukme minutemis: {movie.duration}</p>
  
  <button onClick={handleResClick}>Uzsisakyti</button>
</div>
  )
}

export default FilmoLangas
