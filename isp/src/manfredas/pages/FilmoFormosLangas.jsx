import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}


function FilmoFormosLangas() {
    const [movie, setMovie] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [description, setDescription] = useState("");
    const [officialTrailerLink, setOfficialTrailerLink] = useState("");
    const [duration, setDuration] = useState(0);
    const [studio, setStudio] = useState("");
    const [isDubbed, setIsDubbed] = useState(false);
    const [hasSubtitles, setHasSubtitles] = useState(false);
    const [movieLanguage, setMovieLanguage] = useState("");
    const [ageCensorship, setAgeCensorship] = useState("");
    
    const [movieLanguageList, setMovieLanguageList] = useState([]);
    const [ageCensorshipList, setAgeCensorshipList] = useState([]);
    
    const getMovieLanguageList = async () => {
        const response = await axios.get('https://localhost:7241/GetAvailableMovieLanguageList');
        setMovieLanguageList(response.data);
    };

    const getAgeCensorshipList = async () => {
        const response = await axios.get('https://localhost:7241/GetMovieAgeCensorshipList');
        setAgeCensorshipList(response.data);
    };

    const handleSubmit = async () => {
        const movieData = {
            id: 0,
            title: movie,
            startingFrom: startDate,
            showingUntil: endDate,
            cover: coverImage,
            isDubbed: isDubbed,
            subtitles: hasSubtitles,
            description: description,
            trailerLink: officialTrailerLink,
            duration: parseInt(duration),
            studio: studio,
            language: movieLanguage,
            ageCensorship: ageCensorship
        };
    
        try {
            const response = await axios.post('https://localhost:7241/AddNewMovie', movieData);
            alert("Filmas pridėtas sėkmingai!");
            Navigate('/');
        } catch (error) {
            alert("Filmas nebuvo pridėtas į duomenų bazę.");
        }
    };

    useEffect(() => {
        getMovieLanguageList();
        getAgeCensorshipList();
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <h1>Naujo filmo forma</h1>

            {inputTextBox("Filmo pavadinimas", movie, (e) => setMovie(e.target.value))}
            {inputTextBox("Pradedamas rodyti nuo", startDate, (e) => setStartDate(e.target.value))}
            {inputTextBox("Baigiamas rodyti iki", endDate, (e) => setEndDate(e.target.value))}
            {inputTextBox("Viršelio nuotraukos vieta (.jpg formato)", coverImage, (e) => setCoverImage(e.target.value))}
            {selectValueBox("Yra dubliuotas", ["Taip", "Ne"], isDubbed ? "Taip" : "Ne", (e) => setIsDubbed(e.target.value === "Taip"))}
            {selectValueBox("Turi subtitrus", ["Taip", "Ne"], hasSubtitles ? "Taip" : "Ne", (e) => setHasSubtitles(e.target.value === "Taip"))}
            {inputTextBox("Filmo aprašas", description, (e) => setDescription(e.target.value))}
            {inputTextBox("Nuoroda į oficialų anonsą", officialTrailerLink, (e) => setOfficialTrailerLink(e.target.value))}
            {inputTextBox("Trukmė sekundėmis", duration, (e) => setDuration(e.target.value))}
            {inputTextBox("Filmo studija", studio, (e) => setStudio(e.target.value))}
            {selectValueBox(
                "Filmo kalba",
                movieLanguageList,
                movieLanguage,
                (e) => setMovieLanguage(parseInt(e.target.value))
            )}
            {selectValueBox(
                "Amžiaus cenzas",
                ageCensorshipList,
                ageCensorship,
                (e) => setAgeCensorship(parseInt(e.target.value))
            )}

            <button onClick={handleSubmit}>Save Movie</button>
        </div>
    );
}

export default FilmoFormosLangas;
