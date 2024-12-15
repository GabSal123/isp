import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VerifyEmail = () => {
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
                const response = await axios.get(`https://localhost:7241/VerifyEmail?token=${token}`);
                setMessage(response.data);
                navigate(`/prisijungimas`);
            } catch (error) {
                setMessage("Nepavyko patvirtinti jūsų pašto.");
            }
        };

        verifyToken();
    }, [searchParams]);

    return (
        <div className = "verification-container">
            <h1>Pašto patvirtinimas</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;