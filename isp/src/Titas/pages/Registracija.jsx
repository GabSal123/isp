import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/RegistrationStyles.css';
import defaultPicture from '../assets/defaultPP.png';

const Registracija = ()=> {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(defaultPicture);
    const [age, setAge] = useState("");
    const [loyaltyCredit, setLoyaltyCredit] = useState(0);
    const [gender, setGender] = useState("");
    const [level, setLevel] = useState(1);
    const [userType, setUserType] = useState(1);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

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
        setGender(temp.target.value);
        setSubmitted(false);

    }

    //level updates after registration
    //usertype is automaticly set by admin?

    //Form submission
    const navigate = useNavigate();
    const handleSubmit = (temp) => {
        temp.preventDefault();
        if (name === "" || email === "" || password === "" || userName === "" || surName === ""
            || age === "" || gender === "") {
            setError(true);
            setSubmitted(false); 

            

        } else {
            setSubmitted(true);
            setError(false);
            
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

    const errorMessage = () => {
        return (
            <div
                className="registration-error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Prašome įvesti visus laukus</h1>
            </div>
        );
    };

    return (
    <body className = 'registration-body'>
        <div className ="registration-container">
            <h1 className='registration-h1'>Registracija</h1>
            <div className = "registration-messages">
                {errorMessage()}
                {successMessage()}
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
                        value="Male"
                        checked={gender === "Male"}
                        onChange={handleGender}
                    />
                Male
                </label>
                <label className = "labelRadio">
                    <input
                        type="radio"
                         value="Female"
                        checked={gender === "Female"}
                        onChange={handleGender}
                    />
                Female
                </label>
                <label className = "labelRadio">
                    <input
                        type="radio"
                        value="Other"
                        checked={gender === "Other"}
                        onChange={handleGender}
                    />
                    Other
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