import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function displayMovie(movie) {
    return (
        <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`/src/manfredas/assets/movie_covers/${movie.title}.jpg`}/>
            <p>{movie.description}</p>
        </div>
    );
}


function PagrindinisFilmuLangas() {
    const [movieList, setMovieList] = useState([])

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetAllMovies`)
            .then((result)=>{
                setMovieList(result.data);
                console.log(result);
            })
    }, [])

    
    const navigate = useNavigate();
    const navigateToFilmoLangas = () => {
        navigate(`/FilmoLangas`);
    };

    return (
        <div>
            <h1>
                Pagrindinis filmų langas
            </h1>
            <div>
               {movieList.map((movie) => displayMovie(movie))}
            </div>
            <br></br>
            <button onClick={navigateToFilmoLangas}>I filmo langa</button>
        </div>
    )
}

export default PagrindinisFilmuLangas