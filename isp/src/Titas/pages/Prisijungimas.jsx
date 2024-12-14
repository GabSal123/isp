import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/LoginStyles.css';

const  Prisijungimas = () => {
    

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleUserName = (temp) => {
        setUsername(temp.target.value);
        setSubmitted(false);
    }

    const handlePassword = (temp) => {
        setPassword(temp.target.value);
        setSubmitted(false);
    }
    const navigate = useNavigate();
    const handleSubmit = async (temp) => {
        temp.preventDefault(); 
        
        
        const responseId = await axios.get("https://localhost:7241/GetId", {params: {username: userName , password: password}});
        const id = responseId.data;
        if (id !== null || id !== undefined) {
            setSubmitted(true);
            setError(false);

            navigate(`/${id}`);
        } else {
            setError(true);
            setSubmitted(false);
        }
    };

    const successMessage = () => {
        return (
            <div
                className="login-success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Sveiki sugrįžę! {userName}</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="login-error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Neteisingi vartotojo duomenys</h1>
            </div>
        );
    };

    return (
        <body className ='login-body'>
        <div className="login-container">
            <h1 className='login-h1'>Prisijungimas</h1>
            <div className="login-messages">
                {errorMessage()}
                {successMessage()}
            </div>
            <form onSubmit={handleSubmit}>
                {/* Inputs for form data */}
                <label className="login-label">Prisijungimo vardas</label>
                <input
                    onChange={handleUserName}
                    className="login-input"
                    value={userName}
                    type="text"
                />

                <label className="login-label">Slaptažodis</label>
                <input
                    onChange={handlePassword}
                    className="login-input"
                    value={password}
                    type="password"
                />
                <button className="login-btn" type="submit">
                    Prisijungti
                </button>
            </form>
        </div>
    </body>
    );
}

export default Prisijungimas;
