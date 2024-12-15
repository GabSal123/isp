import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../styles/RegistrationStyles.css';
import defaultPicture from '../assets/defaultPP.png';


const ProfilioRedagavimas = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState(3);

    const [submitted, setSubmitted] = useState(false);
    const [userError, setUserError] = useState(false);
    const [emptyFieldsError, setEmptyFieldsError] = useState(false);
    const [gmailError, setGmailError] = useState(false);

    const handleUserName = (temp) =>{
        setUsername(temp.target.value);
        setSubmitted(false);

    }
    
    const handlePassword = (temp) =>{
        setPassword(temp.target.value);
        setSubmitted(false);

    }

    const handleName = (temp) =>{
        setName(temp.target.value);
        setSubmitted(false);

    }

    const handleSurname = (temp) =>{
        setSurname(temp.target.value);
        setSubmitted(false);

    }

    const handleEmail = (temp) =>{
        setEmail(temp.target.value);
        setSubmitted(false);

    }


    const handleAge = (temp) =>{
        setAge(temp.target.value);
        setSubmitted(false);

    }


    const handleGender = (temp) =>{
        let genderValue = temp.target.value;
        let genderEnumValue;

    
        if (genderValue === "Vyras") {
            genderEnumValue = 1; 
        } else if (genderValue === "Moteris") {
            genderEnumValue = 2;
        } else if (genderValue === "Kita") {
            genderEnumValue = 3; 
        }

        setGender(genderEnumValue); 
        setSubmitted(false);

    }

    const payload = {
        "username": userName,
        "name": name,
        "password": password,
        "surname": surName,
        "email": email,
        "age": age, 
        "gender": gender, 
    };

    const navigate = useNavigate();
    const sessionId = localStorage.getItem("id");
    console.log("Session ID:", parseInt(sessionId, 10));

    const handleSubmit = async (temp) => {
        const sessionId = localStorage.getItem("id");
        if (!sessionId) {
            console.error("Session ID is missing");
            return;
        }
        temp.preventDefault();
        if (name === "" || email === "" || password === "" || userName === "" || surName === ""
            || age === "" || gender === "") {
            setEmptyFieldsError(true);
            setSubmitted(false);            

        }
        if(userName.length < 6 || password.length < 6){
            setUserError(true);
            setSubmitted(false); 
        }
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email))) {
            setGmailError(true);
            setSubmitted(false);
        }
        else {
            try{
                const response = await axios.put("https://localhost:7241/UpdateUserCredentials", null, {
                    params: { id: sessionId,
                            name: name,
                            surname: surName,
                            username: userName,
                            password: password,
                            email: email,
                            age: age,
                            gender: gender
    
                        },
                
            });
            (response.data);
            alert("Vartotojas atnaujintas sėkmingai!");
            
           
            }
            catch (error) {
                console.error("Klaida atnaujinant vartotoją:", error);
                alert("Nepavyko atnaujinti vartotojo.");
            }
                               
            setSubmitted(true);
            setEmptyFieldsError(false);
            setUserError(false);
            setGmailError(false);
            
            navigate(`/profilis`);
        }
    };
    const successMessage = () => {
        return (
            <div
                className="registration-success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Vartotojas {userName} duomenys sėkmingai atnaujinti!!</h1>
            </div>
        );
    };

    const errorMessageEmptyFields = () => {
        return (
            <div
                className="registration-error"
                style={{
                    display: emptyFieldsError ? "" : "none",
                }}
            >
                <h1>Prašome įvesti visus laukus</h1>
            </div>
        );
    };

    const errorMessageShortValue = () => {
        return (
            <div
                className="registration-error"
                style={{
                    display: userError ? "" : "none",
                }}
            >
                <h1>Minimalus slp/prsjng vardo ilgis: 6 simboliai</h1>
            </div>
        );
    };

    const errorMessageEmail = () => {
        return (
            <div
                className="registration-error"
                style={{
                    display: gmailError ? "" : "none",
                }}
            >
                <h1>Netinkamas pašto formatas</h1>
            </div>
        );
    };

    return (
        <body className = 'registration-body'>
            <div className ="registration-container">
                <h1 className='registration-h1'>Duomenų atnaujinimas</h1>
                <div className = "registration-messages">
                    {errorMessageEmptyFields()}
                    {errorMessageShortValue()}
                    {successMessage()}
                    {errorMessageEmail()}
                </div>
                <form>
                    {/*Inputs for form data */}
                    <label className = "registration-label">Prisijungimo vardas</label>
                    <input 
                        onChange = {handleUserName}
                        className = "registration-input"
                        value = {userName}
                        type = "text"
                        />
    
                    <label className = "registration-label">Slaptažodis</label>
                    <input 
                        onChange = {handlePassword}
                        className = "registration-input"
                        value = {password}
                        type = "password"
                        />
    
                    <label className = "registration-label">Vardas</label>
                    <input 
                        onChange = {handleName}
                        className = "registration-input"
                        value = {name}
                        type = "text"
                        />
                
                    <label className = "registration-label">Pavardė</label>
                    <input 
                        onChange = {handleSurname}
                        className = "registration-input"
                        value = {surName}
                        type = "text"
                        />
                    
                    <label className = "registration-label">El. Paštas</label>
                    <input 
                        onChange = {handleEmail}
                        className = "registration-input"
                        value = {email}
                        type = "email"
                        />
    
                    <label className = "registration-label">Amžius</label>
                    <input 
                        onChange = {handleAge}
                        className = "registration-input"
                        value = {age}
                        type = "number"
                        />
    
                    <label className = "registration-label">Lytis</label>
                    <div>
                    <label className = "labelRadio">
                        <input
                            type="radio"
                            value="Vyras"
                            checked={gender === 1}
                            onChange={handleGender}
                        />
                    Vyras
                    </label>
                    <label className = "labelRadio">
                        <input
                            type="radio"
                            value="Moteris"
                            checked={gender === 2}
                            onChange={handleGender}
                        />
                    Moteris
                    </label>
                    <label className = "labelRadio">
                        <input
                            type="radio"
                            value="Kita"
                            checked={gender === 3}
                            onChange={handleGender}
                        />
                    Kita
                    </label>
                    </div>
                    
                    <button onClick={handleSubmit} className="registration-btn" type="submit">
                        Atnaujinti duomenis
                    </button>
                </form>
                    
            </div>
        </body>
        )



}
export default ProfilioRedagavimas