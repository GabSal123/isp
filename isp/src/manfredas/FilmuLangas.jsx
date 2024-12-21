// Allways needed
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// For API calls
import axios from 'axios';
import FilmoForma from './FilmoForma';

function FilmuLangas() {
    const [movieList, setMovieList] = useState([])

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetAllMovies`)
        .then((result)=>{console.log(result)})
    }, [])

    const navigate = useNavigate();
    const navigateToFilmoForma = () => {
        navigate(`/FilmoForma`);
    };

    return (
        <div>
            Hello World
            <br></br>
            <button onClick={navigateToFilmoForma}>I filmo forma</button>
        </div>
    )
}

export default FilmuLangas