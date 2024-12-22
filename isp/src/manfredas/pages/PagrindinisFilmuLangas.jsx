import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function displayMovie(movie, navigate) {
    const navigateToFilmoLangas = () => {
        navigate(`/FilmoLangas/${movie.id}`);
    };
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
            <h2 style={{
                    maxWidth: '200px',
                    textAlign: 'center',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}>{movie.title}</h2>
            <img 
                src={`/src/manfredas/assets/movie_covers/${movie.title}.jpg`}
                style={{ maxWidth: '200px', maxHeight: '300px' }}
                onClick={navigateToFilmoLangas}
            />
        </div>
    );
}


function PagrindinisFilmuLangas() {
    const [movieList, setMovieList] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetAllMovies`)
            .then((result)=>{
                setMovieList(result.data);
                console.log(result);
            })
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',}}>
                <div style={{ margin: '10% auto', display: 'flex', flexWrap: 'wrap' }}>
                    {movieList.map((movie) => displayMovie(movie, navigate))}
                </div>
            </div>
            <button style={{ marginLeft: 'auto' }} onClick={() => navigate('/FilmoFormosLangas/')}>Pridėti naują filmą</button>
        </div>
        
    );
}

export default PagrindinisFilmuLangas