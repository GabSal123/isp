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
                console.log("Type of Session ID:", typeof sessionId);
                if (!sessionId) {
                    console.error("Session ID is missing");
                    return;
                }
                
                const response = await axios.get("https://localhost:7241/GetUser", {
                    params: { id: sessionId },
                });
                const purchaseResponse = await axios.get("https://localhost:7241/GetPurchases", {
                    params: { id: sessionId },
                });
                let totalSpendings = 0;
                purchaseResponse.data.forEach(purchase =>{
                    totalSpendings += purchase.priceValue;
                })
                let appliedDiscount = 0;
                if (totalSpendings < 100) {
                    appliedDiscount = 0;
                } else if (totalSpendings >= 100 && totalSpendings < 250) {
                    appliedDiscount = 3;
                } else if (totalSpendings >= 250 && totalSpendings < 500) {
                    appliedDiscount = 5;
                } else if (totalSpendings >= 500) {
                    appliedDiscount = 10;
                }
                console.log("total spendings: ", totalSpendings);
                console.log("total discount: ", appliedDiscount);
                console.log("total loyalty: ", response.data.loyaltyMoney);

                //const updatedLoyaltyCredit = response.data.loyaltyMoney + appliedDiscount;
                //updateLoyaltyCredit(sessionId, updatedLoyaltyCredit);
                const couponResponse = await axios.get("https://localhost:7241/GetCoupons", {
                    params: { id: sessionId },
                });
                setCoupons(couponResponse.data);
                setUser(response.data);                     
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
    const updateLoyaltyCredit = async (userId, loyaltyCredit) => {
        try {
            const response = await axios.put("https://localhost:7241/UpdateLoyalty", {loyaltyCredit}, {
                params: { id: userId },
            });
            console.log("Updated data: ", response.data);
        } catch (error) {
            console.error("Error updating loyalty credit:", error);
        }
    };

    

    

    const handleNavigateFilm = () => {
        navigate('/FilmuIstorija');
    };

    const handleNavigateReservation = () => {
        navigate(`/`);  //?????????????????????????
    };
    return (
        <body className="registration-body">
            <div>
                {!user ? ( 
                    <p>Loading user data...</p>
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
                    {!coupons ? (
                        <p>Loading coupon data...</p>
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
                </div>
            </div>
        </body>
    );


}

export default Profilis