import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/FilmStyles.css';
import DisplayFilm from '../components/DisplayFilm';

const FilmuIstorija = () => {
    const [watchedFilm, setWatchedFilms] = useState([]);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const sessionId = localStorage.getItem('id');
                if (!sessionId) {
                    console.error('Session ID is missing');
                    return;
                }

                // Fetch watched films
                const filmsResponse = await axios.get('https://localhost:7241/GetFilms', {
                    params: { id: sessionId },
                });
                const watchedFilms = filmsResponse.data;
                setWatchedFilms(watchedFilms);

                // Extract movie IDs and fetch corresponding movies
                const movieRequests = watchedFilms.map((film) =>
                    axios.get('https://localhost:7241/GetMovie', {
                        params: { id: film.fkMovie },
                    })
                );
                const movieResponses = await Promise.all(movieRequests);
                const moviesData = movieResponses.map((response) => response.data);
                setMovies(moviesData);             
            
              
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        };

        fetchFilmData();
    }, []);

    const handleNavigateProfile = () => {
        navigate('/Profilis');
    };

    return (
        <body className="filmhistory-body">
            <div>
                {watchedFilm === null ? (
                    <p>Kraunama filmų informacija...</p>
                ): watchedFilm.length === 0 ?(
                    <p><strong>Vartotojas neturi jokių peržiūrėtų filmų</strong></p>
                ):(
                    <ul className="filmList">
                        {watchedFilm.map((film, index) => {
                            
                            const matchingMovie = movies[index % movies.length];
                            const actualMovie = Array.isArray(matchingMovie) && matchingMovie.length > 0 ? matchingMovie[0] : matchingMovie;                                            

                            return matchingMovie ? (
                                <li key={film.id}>
                                    <DisplayFilm
                                        movieTitle={actualMovie.title}
                                        rating={film.rating}
                                        date={film.watchDate}
                                        comment={film.comment}
                                    />
                                </li>
                            ) : (
                                <li key={film.id}>Nerasta peržiūrėtų filmų</li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div className="filmbutton-container">
                    <button className="film-button" onClick={handleNavigateProfile}>
                        Atgal į profilį
                    </button>
                    
            </div>
        </body>
    );
};

export default FilmuIstorija;
