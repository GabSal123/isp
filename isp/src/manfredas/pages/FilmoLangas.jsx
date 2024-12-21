import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function displaySelectedMovie(movie) {
    const [ageCensorship, setAgeCensorship] = useState("")
    const [language, setLanguage] = useState("")

    const getAgeCensorship = async () => {
        const response = await axios.get(`https://localhost:7241/GetMovieAgeCencorship?id=${movie.ageCensorship}`);
        console.log(response);
        setAgeCensorship(response.data);
    };

    const getLanguage = async () => {
        const response = await axios.get(`https://localhost:7241/GetMovieLanguage?id=${movie.language}`);
        console.log(response)
        setLanguage(response.data);
    };

    useEffect(() => {
        getAgeCensorship();
        getLanguage();
    },[]);
    return (
        <div>
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
                    maxWidth: '600px',
                    maxHeight: '1200px'
                }}
            >
                <button>Įvertinti</button>
                <h1>{movie.title}</h1>
                <img 
                    src={`/src/manfredas/assets/movie_covers/${movie.title}.jpg`}
                    style={{ maxWidth: '300px', maxHeight: '450px' }}
                />
                <p style={{alignContent: 'center'}}>{movie.description}</p>
                <p>Kalba: {language}</p>
                <p>Amžiaus cenzas: {ageCensorship}</p>
                <p>Studija: {movie.studio}</p>
                <p>Rodomas: nuo {movie.startingFrom} iki {movie.showingUntil}</p>
                <p>Subtitrai: {movie.subtitles === 0 ? "yra" : "nėra"}</p> 
                <p><a href={movie.trailerLink} target="_blank">Oficialus anonsas</a></p>
                <button>Bilietai</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ marginRight: '20px' }}>Ištrinti</button>
                <button>Redaguoti</button>
             </div>
        </div>
    )
}

function FilmoLangas() {
    const { id } = useParams();
    const [movie, setMovie] = useState("")

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetMovieById?id=${id}`)
            .then((result) => {
                console.log(result)
                setMovie(result.data);
            })
    },[id]);

    return (
        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',}}>
            {displaySelectedMovie(movie)}
        </div>
    );
}

export default FilmoLangas