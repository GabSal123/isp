import { useState } from 'react'
import DisplayReservation from '../components/DisplayReservation'
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import "../styles/resstyles.css"
import axios from 'axios';


const Reservations = ()=> {
  const user_id = localStorage.getItem("id");
    console.log(user_id);
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


    const navigate = useNavigate();

    const handleResClick = (id) => {
        console.log(id)
        navigate(`/filmas/${id}`);
    };

  return (

    <div>
        <ul className='displayList'>
        {reservations.map(e=>{
            return <DisplayReservation key={e.id} name={e.movie} cost ={e.cost} onClickShow={()=>handleResClick(e.id)}/>

        })}
        </ul>
    </div>
  )
}

export default Reservations
