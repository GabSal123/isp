import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function inputTextBox(inputFieldName) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
            }}>
            <label>{inputFieldName}</label><br></br>
            <textarea type="text" defaultValue=""></textarea>
        </div>
    );
}

function selectValueBox(inputFieldName, options) {
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <label>{inputFieldName}</label><br></br>
          <select>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
}

function FilmoFormosLangas() {
    const [movie, setMovie] = useState("");
    const navigate = useNavigate();

    const [ageCensorshipList, setAgeCensorship] = useState("")
    const [movieLanguageList, setLanguage] = useState("")

    const getAgeCensorshipList = async () => {
        const response = await axios.get(`https://localhost:7241/GetMovieAgeCensorshipList`);
        console.log(response);
        setAgeCensorship(response.data);
    };

    const getMovieLanguageList = async () => {
        const response = await axios.get(`https://localhost:7241/GetAvailableMovieLanguageList`);
        console.log(response)
        setLanguage(response.data);
    };

    useEffect(() => {
        getAgeCensorshipList();
        getMovieLanguageList();
    },[]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
            }}>
             <h1>Naujo filmo forma</h1>
            {inputTextBox("Filmo pavadinimas")}
            {inputTextBox("Pradedamas rodyti nuo")}
            {inputTextBox("Baigiamas rodyti iki")}
            {inputTextBox("Viršelio nuotraukos vieta (.jpg formato)")}
            {selectValueBox("Yra dubliuotas", ["Taip", "Ne"])} 
            {selectValueBox("Turi subtitrus", ["Taip", "Ne"])}
            {inputTextBox("Filmo aprašas")}
            {inputTextBox("Nuoroda į oficialų anonsą")}
            {inputTextBox("Trukmė sekundėmis")}
            {inputTextBox("Filmo studija")}
            {selectValueBox("Filmo kalba", movieLanguageList.map(e => e.name))}
            {selectValueBox("Amžiaus cenzas", ageCensorshipList.map(e => e.name))}
        </div>
    )
}

export default FilmoFormosLangas