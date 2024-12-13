import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/ProfileStyles.css';
import defaultPicture from '../assets/defaultPP.png'; //Shouldnt be a default picture, but hardcoded for now
import DisplayUser from '../components/DisplayUser';

const Profilis = () => {
    const user = [
        {
            id: 0,
            username: "Lowbobas",
            password: "123123",
            name: "Tomas",
            surname: "Labanauskas",
            email: "tomasl@gmail.com",
            profilepicture: "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
            age: "18",
            loyaltycredit: "3%",
            gender: 1,
            level: 1,
            usertype: "Klientas"

        }
    ];
    const coupons = [
        {
            id: 0,
            code: "jeHT3V7X1lkkItMwXrsK"
        },
        {
            id: 1,
            code: "ABCD1234EFGH5678"
        }
    ];

    const navigate = useNavigate();

    const handleNavigateFilm = () => {
        navigate('/FilmuIstorija');
    };

    const handleNavigateReservation = () => {
        navigate(`/Reservations/:${user[0].id}`);  //?????????????????????????
    };
    return (
    <body className = 'registration-body'>
        <div>
            <ul className="userList">
                {user.map((u) => ( // Corrected the variable name
                    <li key={u.id}>
                        <DisplayUser
                            username={u.username}
                            password={u.password}
                            name={u.name}
                            surname={u.surname}
                            email={u.email}
                            profilepicture={u.profilepicture}
                            age={u.age}
                            loyaltycredit={u.loyaltycredit}
                            gender={u.gender}
                            level={u.level}
                            usertype={u.usertype}
                        />
                    </li>
                ))}
            </ul>
            <div className='profile-container'>  
                <h1 className='profile-h1'>Vartotojo kuponai</h1>
                <ul className="couponList">
                    {coupons.map((coupon) => ( 
                        <li key={coupon.id}>
                            <span>Kupono kodas: {coupon.code}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='profile-container'>
                <button className='profile-button' onClick={handleNavigateFilm}>Filmų istorija</button>
                <button className='profile-button' onClick={handleNavigateReservation}>Rezervacijos</button>
            </div>
            
        </div>
    </body>

    );


}

export default Profilis