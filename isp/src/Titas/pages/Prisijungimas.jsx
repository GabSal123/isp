import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

const Prisijungimas = () => {
    const user = [
        {
            userName: "Lowbobas",
            password: "123123"
        }
    ];

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

    const handleSubmit = (temp) => {
        temp.preventDefault(); 
        const hardcodedUser = user[0]; 
  
        if (userName === hardcodedUser.userName && password === hardcodedUser.password) {
            setSubmitted(true);
            setError(false);
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
