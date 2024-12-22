import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function FilmoVertinimoFormosLangas() {
    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0); // 1 to 5 stars
    const [comment, setComment] = useState("");

    useEffect(() => {
        axios
            .get(`https://localhost:7241/GetMovieById?id=${id}`)
            .then((result) => {
                setMovie(result.data);
            })
            .catch((error) => {
                console.error("Nepavyko susiekti su duomenų baze!", error);
            });
    }, [id]);

    const handleRatingClick = (star) => {
        setRating(star);
    };

    const handleSubmit = () => {
        const watchedMovie = {
            WatchDate: new Date().toISOString().split('T')[0],
            Comment: String(comment) || null,
            Rating: parseInt(rating),
            FkMovie: parseInt(id),
            FkRegisteredUser: 1,
        };

        axios
            .post('https://localhost:7241/SubmitMovieReview', watchedMovie)
            .then(() => {
                alert("Jūsų vertinimas įrašytas!");
            })
            .catch(() => {
                alert("Jūsų vertinimo forma buvo atmesta!");
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
            }}
        >
            <h1>{movie.title}</h1>
            <img
                src={`/src/manfredas/assets/movie_covers/${movie.title}.jpg`}
                    alt={`${movie.title} viršėlis`}
                    style={{ width: '300px', height: 'auto', borderRadius: '10px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        style={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: star <= rating ? '#FFD700' : '#E0E0E0',
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                placeholder="Palikite komentarą (pasirinktinai)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                    width: '80%',
                    height: '100px',
                    padding: '10px',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default FilmoVertinimoFormosLangas;
