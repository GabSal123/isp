import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function displaySelectedMovie(movie) {
    return (
        <div>
            <h1>{movie.title}</h1>
            <br></br>
            <p>{movie.description}</p>
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
        <div>
            {displaySelectedMovie(movie)}
        </div>
    );
}

export default FilmoLangas