import React from 'react';
import { useState } from 'react';
import '../styles/ProfileStyles.css';

const DisplayUser = ({username, password, name, surname, email, profilepicture, age,
    loyaltycredit, gender, level, usertype}) => {
         
    const [showPassword, setShowPassword] = useState(false);

   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
        return (
            <div className='profile-container'>
                <div>
                    <div>
                        <img src = {profilepicture} about={`${name} ${surname}`} className='profile-picture'/>
                    </div>  
                    <div>
                        <strong>Vardas</strong>
                        <p className='profile-p'>{name} </p>
                        <strong>Pavardė</strong>
                        <p className='profile-p'>{surname} </p>
                    </div>             
                    
                </div>
                <div className ='additionalinfo-container'>
                    <strong>Prisijungimo vardas</strong>
                    <p className='profile-p'>{username} </p>
                    <strong>Slaptažodis</strong>
                    <div className='password-container'>
                        <p className='profile-p'>{showPassword ? password : '*'.repeat(password.length)}</p>                   
                        <button onClick={togglePasswordVisibility} className='toggle-password-btn'>
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <strong>El. Paštas</strong>
                    <p className='profile-p'>{email} </p>
                    <strong>Amžius</strong>
                    <p className='profile-p'>{age} </p>
                    <strong>Lytis</strong>
                    <p className='profile-p'>{gender} </p>
                </div>
                
                
                <div className ='creditsinfo-container'>             
                    <strong>Lojalumo lygis</strong>
                    <p className='profile-p'>{level} </p>
                    <strong>Vartotojo tipas</strong>
                    <p className='profile-p'>{usertype} </p>
                    <strong>Taikoma nuolaida</strong>
                    <p className='profile-p'>{loyaltycredit} </p>
                </div>

                
                

            </div>
        )
    }

    export default DisplayUser