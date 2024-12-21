// Allways needed
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// For API calls
import axios from 'axios';
import FilmoVertinimoFormosLangas from './FilmoVertinimoFormosLangas';

function PagrindinisFilmuLangas() {
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
            Pagrindinis filmų langas
            <br></br>
            <button onClick={navigateToFilmoForma}>I filmo forma</button>
        </div>
    )
}

export default PagrindinisFilmuLangas