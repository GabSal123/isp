import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FilmoVertinimoFormosLangas from './FilmoVertinimoFormosLangas';

function PagrindinisFilmuLangas() {
    const [movieList, setMovieList] = useState([])

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetAllMovies`)
        .then((result)=>{console.log(result)})
    }, [])

    const navigate = useNavigate();
    const navigateToFilmoLangas = () => {
        navigate(`/FilmoLangas`);
    };

    return (
        <div>
            Pagrindinis filmų langas
            <br></br>
            <button onClick={navigateToFilmoLangas}>I filmo langa</button>
        </div>
    )
}

export default PagrindinisFilmuLangas