import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/resstyles.css"
import DisplayReservation from '../components/DisplayReservation';
import '../styles/ReservationStyles.css';
import axios from 'axios';
import Cart from "../../Justina/assets/Cart.png";

const RezervacijuLangas = ()=> {
  const user_id = localStorage.getItem("id");
  const cart_id = localStorage.getItem("cartId");
  const [reservations, setReservations] = useState([])
  useEffect(()=>{
    axios.get(`https://localhost:7241/GetReservations?userId=${user_id}`)
    .then((res)=>{
      setReservations(res.data)
    })
  },[])

    const navigate = useNavigate();
    const handleInfoClick = (id) => {
        navigate(`/revervacijosinfo/${id}`);
    };

    const handleDeleteClick = (id,cartId) => {
      axios.delete(`https://localhost:7241/DeleteReservation?shoppingCartId=${cartId}&sessionId=${id}`).then((res)=>{
        setReservations((prevReservations) =>
          prevReservations.filter((res) => res.movieSessionId !== id)
        );
      }).catch((err) => {
        console.error('Error deleting reservation:', err);
      });
    };
    const handleCartClick = () => {
      navigate("/krepselis");
    };
    const handleEditClick = (id) => {
      navigate(`/seansas/${id}/edit`);
    };
    return (
      <div className="reservations-container">
        <h1>Mano Rezervacijos</h1>
        <img src={Cart} alt="Cart" className="back-button" onClick={handleCartClick} />
        <button onClick={()=>navigate("/")}>Pagrindinis</button>
        <div className="reservations-grid">
          {reservations.map((res, index) => (
            <DisplayReservation
              key={index}
              date={res.day}
              name={res.movieTitle}
              cost={res.totalPrice}
              onClickShow={() => handleInfoClick(res.movieSessionId)}
              onClickEdit={() => handleEditClick(res.movieSessionId)}
              onClickDelete={() => handleDeleteClick(res.movieSessionId,cart_id)}
            />
          ))}
        </div>
      </div>
    );


}

export default RezervacijuLangas
