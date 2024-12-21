import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function textInputArea(text) {
    return (
        <div>
            <textarea type="text" defaultValue={text} style={{display: 'flex'}}></textarea>
        </div>
    );
}

function displayMovieEditingForm(movie) {
    return (
        <div
            key={movie.id}
            style={{
                display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
            }}
        >
            <h1>Filmo redagavimas</h1>
            {textInputArea(movie.title)}
            {textInputArea(movie.startingFrom)}
            {textInputArea(movie.showingUntil)}
            {textInputArea(movie.cover)}
            {textInputArea(movie.isDubbed)}
            {textInputArea(movie.subtitles)}
            {textInputArea(movie.description)}
            {textInputArea(movie.trailerLink)}
            {textInputArea(movie.duration)}
            {textInputArea(movie.studio)}
            {textInputArea(movie.language)}
            {textInputArea(movie.ageCensorship)}
        </div>
    )
}

function FilmoRedagavimoFormosLangas() {
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
            {displayMovieEditingForm(movie)}
        </div>
    );
}

export default FilmoRedagavimoFormosLangas