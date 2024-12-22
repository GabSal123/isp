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
    const [movieLanguageList, setMovieLanguageList] = useState([]);
    const [ageCensorshipList, setAgeCensorshipList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [movieResponse, languageResponse, censorshipResponse] = await Promise.all([
              axios.get(`https://localhost:7241/GetMovieById?id=${id}`),
              axios.get('https://localhost:7241/GetAvailableMovieLanguageList'),
              axios.get('https://localhost:7241/GetMovieAgeCensorshipList'),
            ]);
      
            setMovie(movieResponse.data);
            setMovieLanguageList(languageResponse.data);
            setAgeCensorshipList(censorshipResponse.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <div>
            <label>{ageCensorshipList.at(0).name} I'm fine, this is fine</label>
        </div>
    );
}

export default FilmoRedagavimoFormosLangas