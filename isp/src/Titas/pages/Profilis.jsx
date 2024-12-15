import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import '../styles/ProfileStyles.css';
import defaultPicture from '../assets/defaultPP.png'; //Shouldnt be a default picture, but hardcoded for now
import DisplayUser from '../components/DisplayUser';
import DisplayCoupon from '../components/DisplayCoupon';

const Profilis = () => {
    const [user, setUser] = useState(null); 
    const [coupons, setCoupons] = useState([]);
    
    const navigate = useNavigate();
    const userTypes = {
        1: "Administratorius",
        2: "Klientas",
        3: "Darbuotojas"
    };
    const userGenders = {
        1: "Vyras",
        2: "Moteris",
        3: "Kita"
    }
    const userLevels = {
        1: "Bronza",
        2: "Sidabras",
        3: "Auksas",
        4: "Deimantas"
    }

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                
                const sessionId = localStorage.getItem("id");
                console.log("Session ID:", parseInt(sessionId, 10));
                if (!sessionId) {
                    console.error("Session ID is missing");
                    return;
                }
                
                const response = await axios.get("https://localhost:7241/GetUser", {
                    params: { id: sessionId },
                });
                
                const couponCountResponse = await axios.get("https://localhost:7241/GetCouponsCount", {
                    params: { id: sessionId },
                });
                
                console.log("c count", couponCountResponse.data);
                if(couponCountResponse.data > 0)
                {
                    const couponResponse = await axios.get("https://localhost:7241/GetCoupons", {
                        params: { id: sessionId },
                    });
                    
                    setCoupons(couponResponse.data);
                }
                else{
                    setCoupons([]);
                }
                
                
                //setCoupons(couponResponse.data);
                setUser(response.data);                     
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUserCredit = async () => {
        const sessionId = localStorage.getItem("id");
        
        if (!sessionId) {
            console.error("Session ID is missing");
            return;
        }

        try {
            
            const response = await axios.put("https://localhost:7241/UpdateUserCredit", null, {
                params: { id: sessionId },
            });
           
            (response.data);
            alert("Vartotojo taikoma nuolaida atnaujinta sėkmingai!");
            window.location.reload();

        } catch (error) {
            console.error("Kliūtis atnaujinant vartotojo taikomą nuolaidą:", error);
            alert("Vartotojo taikoma nuolaida neatnaujinta.");
        }
    };

    

 

    const handleNavigateFilm = () => {
        navigate('/FilmuIstorija');
    };

    const handleNavigateReservation = () => {
        navigate(`/`);  
    };
    const handleNavigateProfileUpdate = () => {
        navigate('/Profilioredagavimas');
    };
    return (
        <body className="registration-body">
            <div>
                {!user ? ( 
                    <p>Kraunama vartotojo informacija...</p>
                ) : (
                    <ul className="userList">
                        <li key={user.id}>
                            <DisplayUser
                                username={user.username}
                                password={user.password}
                                name={user.name}
                                surname={user.surname}
                                email={user.email}
                                profilepicture={user.profilepicture || defaultPicture} 
                                age={user.age}
                                loyaltycredit={user.loyaltyMoney}
                                gender={userGenders[user.gender] || "Unknown"}
                                level={userLevels[user.level || "Unknown"]}
                                usertype={userTypes[user.userType] || "Unknown"}
                            />
                        </li>
                    </ul>
                )}
               <div className="profile-container">
               {coupons === null ? (
                <p>Kraunama kuponų informacija...</p>
                ) : coupons.length === 0 ? (
                <p><strong>Vartotojas neturi jokių kuponų</strong></p>
                ) : (
                    <>
                         <h1 className="profile-h1">Vartotojo kuponai</h1>
                            <ul className="couponList">
                            {coupons.map((coupon) => (
                                <li key={coupon.id}>
                                    <DisplayCoupon
                                        priceValue={coupon.priceValue}
                                        buyerUsername={coupon.buyerUsername}
                                    />
                                </li>
                            ))}
                            </ul>
                        </>
                    )}
                </div>

                <div className="profile-container">
                    <button className="profile-button" onClick={handleNavigateFilm}>
                        Filmų istorija
                    </button>
                    <button className="profile-button" onClick={handleNavigateReservation}>
                        Rezervacijos
                    </button>
                    <button className="profile-button" onClick={handleUpdateUserCredit}>
                        Atnaujinti taikomą nuolaidą
                    </button>
                    <button className="profile-button" onClick={handleNavigateProfileUpdate}>
                        Atnaujinti profilio duomenis
                    </button>
                </div>
            </div>
        </body>
    );


}

export default Profilis