import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VerifyLogin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setMessage("Netinkama patvirtinimo nuoroda.");
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7241/VerifyLogin?token=${token}`);
                setMessage("lol");
                navigate(`/profilis`);
            } catch (error) {
                setMessage("Nepavyko patvirtinti jūsų prisijungimo.");
            }
        };

        verifyToken();
    }, [searchParams]);

    return (
        <div className = "verification-container">
            <h1>Prisijungimo patvirtinimas</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyLogin;