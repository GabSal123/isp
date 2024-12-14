import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../styles/RegistrationStyles.css';
import defaultPicture from '../assets/defaultPP.png';

const Registracija = ()=> {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(defaultPicture);
    const [age, setAge] = useState();
    const [loyaltyCredit, setLoyaltyCredit] = useState(0);
    const [gender, setGender] = useState(3);
    const [level, setLevel] = useState(1);
    const [userType, setUserType] = useState(2);

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

    //no profile picture upon registration?

    const handleAge = (temp) =>{
        setAge(temp.target.value);
        setSubmitted(false);

    }

    //no loyaltycredit on registration

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

    //level updates after registration
    //usertype is automaticly set by admin?
    const payload = {
        "username": userName,
        "name": name,
        "password": password,
        "surname": surName,
        "email": email,
        "profilePicture": "profilePicture",  
        "age": age,
        "loyaltyMoney": loyaltyCredit,  
        "gender": gender,
        "level": level,  
        "userType": userType,  
    };


   
    //Form submission
    const navigate = useNavigate();
    const handleSubmit = (temp) => {
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

            axios.post("https://localhost:7241/AddUser", payload);
            console.log(payload);
                               
            setSubmitted(true);
            setEmptyFieldsError(false);
            setUserError(false);
            setGmailError(false);
            
            navigate(`/prisijungimas`);
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
                <h1>Vartotojas {userName} sėkmingai užregistruotas!!</h1>
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
            <h1 className='registration-h1'>Registracija</h1>
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
                    Registruotis
                </button>
            </form>
                
        </div>
    </body>
    )


}

export default Registracija