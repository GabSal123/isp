import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function FilmoVertinimoFormosLangas() {
    const { id } = useParams();

    const [movie, setMovie] = useState("")

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetMovieById?id=${id}`)
            .then((result) => {
                console.log(result)
                setMovie(result.data);
            })
    },[]);

    return (
        <div>
            {movie.title} vertinimo forma
        </div>
    )
}

export default FilmoVertinimoFormosLangas