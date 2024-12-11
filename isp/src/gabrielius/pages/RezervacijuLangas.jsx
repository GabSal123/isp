import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import DisplayReservation from '../components/DisplayReservation';
import '../styles/ReservationStyles.css';

const RezervacijuLangas = ()=> {
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
        navigate(`/revervacijosinfo/${id}`);
    };

    return (
      <div className="reservations-container">
        <h1>Mano Rezervacijos</h1>
        <div className="reservations-grid">
          {reservations.map((res, index) => (
            <DisplayReservation
              key={index}
              name={res.movie}
              cost={res.cost}
              onClickShow={() => handleResClick(res.id)}
              onClickEdit={() => console.log('Edit', res.id)}
              onClickDelete={() => console.log('Delete', res.id)}
            />
          ))}
        </div>
      </div>
    );


}

export default RezervacijuLangas
