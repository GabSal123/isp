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
                        params: { id: film.id },
                    })
                );
                const movieResponses = await Promise.all(movieRequests);
                const moviesData = movieResponses.map((response) => response.data);
                setMovies(moviesData);

                console.log('Watched Films:', watchedFilms);
                console.log('Movies:', moviesData);
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
                {watchedFilm.length === 0 ? (
                    <p>Loading film data...</p>
                ) : (
                    <ul className="filmList">
                        {watchedFilm.map((film, index) => {
                            // Match movie using the logic of index % movie.length
                            const matchingMovie = movies[index % movies.length];

                            console.log("Film:", film);
                            console.log("Matching movie:", matchingMovie);

                            return matchingMovie ? (
                                <li key={film.id}>
                                    <DisplayFilm
                                        movieTitle={matchingMovie.title}
                                        rating={film.rating}
                                        date={film.watchDate}
                                        comment={film.comment}
                                    />
                                </li>
                            ) : (
                                <li key={film.id}>No matching movie found</li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </body>
    );
};

export default FilmuIstorija;
