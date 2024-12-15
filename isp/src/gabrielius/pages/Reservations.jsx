import { useState, useEffect } from 'react'
import DisplayMovie from '../components/DisplayMovie'
import { useNavigate } from 'react-router-dom';
import "../styles/resstyles.css"
import axios from 'axios';


const Reservations = ()=> {
  const user_id = localStorage.getItem("id");
    console.log(user_id);
    const [reservations, setReservations] = useState([])

    useEffect(()=>{
        axios.get(`https://localhost:7241/GetAllMovies`)
        .then((res)=>{setReservations(res.data)})

    },[])
    const reservationsss = [
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
        <button onClick={()=>navigate("/profilis")}>Profilis</button>
        <ul className='displayList'>
        {reservations.map(e=>{
            return <DisplayMovie key={e.id} name={e.title} onClickShow={()=>handleResClick(e.id)}/>

        })}
        </ul>
    </div>
  )
}

export default Reservations
