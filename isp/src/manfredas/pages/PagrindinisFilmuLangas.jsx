import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function displayMovie(movie) {
    return (
        <div 
            key={movie.id}
            style={{
                backgroundColor: '#f0f0f0', 
                borderRadius: '10px', 
                padding: '20px', 
                margin: '10px', 
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                maxWidth: '300px',
                maxHeight: '600px'
            }}
        >
            <h2>{movie.title}</h2>
            <img 
                src={`/src/manfredas/assets/movie_covers/${movie.title}.jpg`}
                style={{ maxWidth: '200px', maxHeight: '300px' }}
            />
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