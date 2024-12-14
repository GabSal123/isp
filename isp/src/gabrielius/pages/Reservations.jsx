import { useState } from 'react'
import DisplayReservation from '../components/DisplayReservation'
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import "../styles/resstyles.css"
import axios from 'axios';


const Reservations = ()=> {
    const id = ReactSession.get("id");
    console.log(id);
    const reservations = [
        {id: 0,
        movie: "Titanikas",
        cost: 12
        },
        {id: 1,
            movie: "Karibu piratai",
            cost: 12
        },
        {id: 2,
            movie: "Avataras",
            cost: 12
        },
        {id: 3,
            movie: "Haris Poteris",
            cost: 12
        },

    ]

    const request = axios.get("https://localhost:7241/WeatherForecast");
    request
    .then((res) => res.data)
    .then((data) => console.log(data))
    .catch(() => {
      if (setError) {
        setError(message);
      }
    });


    const navigate = useNavigate();

    const handleResClick = (id) => {
        console.log(id)
        const belekas = {
            "title": "string",
            "startingFrom": "2024-12-14",
            "showingUntil": "2024-12-14",
            "cover": "string",
            "isDubbed": true,
            "subtitles": true,
            "description": "string",
            "trailerLink": "string",
            "duration": 0,
            "studio": "string",
            "language": 0,
            "ageCensorship": 0
          }
        axios.post("https://localhost:7241/AddMovie",belekas)
        navigate(`/seansai/${id}`);
    };

  return (

    <div>
        <ul className='displayList'>
        {reservations.map(e=>{
            return <DisplayReservation key={e.id} name={e.movie} cost ={e.cost} onClick={()=>handleResClick(e.id)}/>

        })}
        </ul>
    </div>
  )
}

export default Reservations
