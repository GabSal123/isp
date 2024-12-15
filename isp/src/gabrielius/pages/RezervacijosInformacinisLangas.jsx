import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DisplayTicket from '../components/DisplayTicket';
import '../styles//RezervacijosInformacinisLangas.css';
import axios from 'axios';

const RezervacijosInformacinisLangas = ()=> {
    const { id } = useParams();
    const cart_id = localStorage.getItem("cartId");
    const [tickets, setTickets] = useState([])
    const [movie, setMovie] = useState({title:""})
    useEffect(()=>{
      const request = axios.get(`https://localhost:7241/GetMovieFromSession?sessionId=${id}`).then((res) => res.data)
    .then((data) => {
      setMovie(data)
    })
    .catch((e) => {
      console.log(e)
    });
   },[])

    useEffect(()=>{

      axios.get(`https://localhost:7241/GetReservationInfo?cartId=${cart_id}&sessionId=${id}`)
      .then((res)=>{
        setTickets(res.data)
      })

    },[])


    return (
        <div className="reservation-info-container">
          <h1 className="reservation-title">Rezervacijos Informacija</h1>
          <div className="reservation-details">
            <p>Filmas: <strong>{movie.title}</strong></p>
          </div>
          <ul className="ticket-list">
            {tickets.map((ticket, index) => (
              <DisplayTicket
                key={index}
                row={ticket.row}
                column={ticket.seat}
                price={ticket.price}
              />
            ))}
          </ul>
        </div>
      );
}

export default RezervacijosInformacinisLangas
