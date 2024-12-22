import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function inputTextBox(inputFieldName, value, onChange) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <label>{inputFieldName}</label><br />
            <textarea 
                value={value} 
                onChange={onChange} 
                type="text" 
            />
        </div>
    );
}

function selectValueBox(inputFieldName, options, value, onChange) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <label>{inputFieldName}</label><br />
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.id || option} value={option.id || option}>
                        {option.name || option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function FilmoRedagavimoFormosLangas() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [movieLanguageList, setMovieLanguageList] = useState([]);
    const [ageCensorshipList, setAgeCensorshipList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieResponse, languageResponse, censorshipResponse] = await Promise.all([
                    axios.get(`https://localhost:7241/GetMovieById?id=${id}`),
                    axios.get('https://localhost:7241/GetAvailableMovieLanguageList'),
                    axios.get('https://localhost:7241/GetMovieAgeCensorshipList')
                ]);

                setMovie(movieResponse.data);
                setMovieLanguageList(languageResponse.data);
                setAgeCensorshipList(censorshipResponse.data);
            } catch (error) {
                alert("Netikėta klaida, prašome bandyti vėliau.");
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://localhost:7241/UpdateMovieDataById`, movie);
            console.log('Movie updated successfully:', response.data);
        } catch (error) {
            alert("Nepavyko išsaugoti filmo, nes toks filmas jau egzistuoja duomenų bazėje.")
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>Filmo redagavimas</h1>

            {inputTextBox("Filmo pavadinimas", movie.title || '', (e) => setMovie({ ...movie, title: e.target.value }))}
            {inputTextBox("Pradedamas rodyti nuo", movie.startingFrom || '', (e) => setMovie({ ...movie, startingFrom: e.target.value }))}
            {inputTextBox("Baigiamas rodyti iki", movie.showingUntil || '', (e) => setMovie({ ...movie, showingUntil: e.target.value }))}
            {inputTextBox("Viršelio nuotraukos vieta", movie.cover || '', (e) => setMovie({ ...movie, cover: e.target.value }))}
            {selectValueBox("Filmo kalba", movieLanguageList, movie.language || 0, (e) => setMovie({ ...movie, language: parseInt(e.target.value) }))}
            {selectValueBox("Amžiaus cenzas", ageCensorshipList, movie.ageCensorship || 0, (e) => setMovie({ ...movie, ageCensorship: parseInt(e.target.value) }))}
            {inputTextBox("Filmo aprašas", movie.description || '', (e) => setMovie({ ...movie, description: e.target.value }))}
            {inputTextBox("Nuoroda į oficialų anonsą", movie.trailerLink || '', (e) => setMovie({ ...movie, trailerLink: e.target.value }))}
            {inputTextBox("Trukmė sekundėmis", movie.duration || '', (e) => setMovie({ ...movie, duration: parseInt(e.target.value) }))}
            {inputTextBox("Filmo studija", movie.studio || '', (e) => setMovie({ ...movie, studio: e.target.value }))}

            <button onClick={handleSave}>Išsaugoti pakeitimus</button>
        </div>
    );
}

export default FilmoRedagavimoFormosLangas;
