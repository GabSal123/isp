import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import '../styles/ProfileStyles.css';
import defaultPicture from '../assets/defaultPP.png'; 
import DisplayUser from '../components/DisplayUser';
import DisplayCoupon from '../components/DisplayCoupon';

const Profilis = () => {
    const [user, setUser] = useState(null); 
    const [coupons, setCoupons] = useState([]);
    const [userType, setLoginStatus] = useState("");
    const [sessionValid, setSessionValid] = useState(false);

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
               
                if (!sessionId) {
                    console.error("Sesijos id nerastas");
                    return;
                }
                
                const response = await axios.get("https://localhost:7241/GetUser", {
                    params: { id: sessionId },
                });
                if(response.data.isloggedin === 0){
                    setSessionValid(false);  
                    return;
                }
                else{
                    setSessionValid(true); 
                }
                
                const couponCountResponse = await axios.get("https://localhost:7241/GetCouponsCount", {
                    params: { id: sessionId },
                });
                
                
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
                console.error("Kliūtis ieškant informacijos:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUserCredit = async () => {
        const sessionId = localStorage.getItem("id");
        
        if (!sessionId) {
            console.error("Sesijos id nerastas");
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
    const handleLogout = async () => {
        const sessionId1 = localStorage.getItem("id");
        const response1 = await axios.put("https://localhost:7241/UpdateLoginStatus", null, {
            params: { id: sessionId1 },
        });
        (response1.data);
        navigate('/Prisijungimas');
    };
    if (!sessionValid) {
        return (
            <body className="registration-body">
                <div className="session-error">
                    <h1><strong>Patvirtinkite savo prisijungimą paspausdami nuorodą, kurią gavote į savo paštą ir atnaujinkite puslapį.</strong></h1>
                </div>
            </body>
        );
    }
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
                                gender={userGenders[user.gender] || "Kita"}
                                level={userLevels[user.level || "Kita"]}
                                usertype={userTypes[user.userType] || "Kita"}
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
                    <div className="profile-button-container">
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
                    <button className="profile-button-logout" onClick={handleLogout}>
                        Atsijungti
                    </button>
                    </div>
                </div>
            </div>
        </body>
    );


}

export default Profilis