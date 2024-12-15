import React, { useEffect, useState } from 'react';
import '../styles/SeatSelection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SeatSelection = ({ session_id, edit }) => {
  const navigate = useNavigate();
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [combinedPrice, setCombinedPrice] = useState(0);
  const [seats, setSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const cart_id = localStorage.getItem("cartId");

  useEffect(() => {
    axios
      .get(`https://localhost:7241/GetAvailableSeats?sessionId=${session_id}`)
      .then((res) => {
        setRows(res.data.number_of_rows);
        setCols(res.data.number_of_columns);
        setTicketPrice(res.data.price);
        if (typeof res.data.takenSeats !== 'undefined') {
          setTakenSeats(res.data.takenSeats);
        }
      });
  }, [session_id]);

  useEffect(() => {
    if (rows && cols) {
      const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
          const isReserved = takenSeats.some((seat) => {
            return seat.row === rowIndex && seat.seat === colIndex;
          });
          const reservedSeat = takenSeats.find(
            (seat) => seat.row === rowIndex && seat.seat === colIndex
          );

          
          const status = reservedSeat
          ? reservedSeat.fkShoppingCart == cart_id
            ? edit === 'edit'
              ? 'selected'
              : 'reserved'
            : 'reserved'
          : 'available';
          return {
            id: `${rowIndex}-${colIndex}`,
            row: `${rowIndex}`,
            col: `${colIndex}`,
            status: status,
          };
        })
      );
      setSeats(initialSeats);
      let c = 0;
      initialSeats.forEach((row) => {
        row.forEach((s) => {
          if (s.status === 'selected') {
            c += 1;
          }
        });
      });
      setCount(c);
      setCombinedPrice(ticketPrice * c);
    }
  }, [rows, cols, takenSeats, edit]);

  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if (seat.status !== 'reserved') {
              const newStatus =
                seat.status === 'available' ? 'selected' : 'available';

              if (newStatus === 'selected') {
                setSelectedSeats((prev) => [
                  ...prev,
                  { row: rowIndex, col: colIndex },
                ]);
              } else {
                setSelectedSeats((prev) =>
                  prev.filter(
                    (s) => !(s.row === rowIndex && s.col === colIndex)
                  )
                );
              }
  
              return { ...seat, status: newStatus };
            }
          }
          return seat;
        })
      );
  
      let c = 0;
      updatedSeats.forEach((row) => {
        row.forEach((s) => {
          if (s.status === 'selected') {
            c += 1;
          }
        });
      });
      setCount(c);
      setCombinedPrice(ticketPrice * c);
      return updatedSeats;
    });
  };
  
  const confirmSeats = () => {
    const user_id = localStorage.getItem("id");
    const cart_id = localStorage.getItem("cartId");
  
    const promises = [];
  
    if (edit === "create") {
      selectedSeats.forEach((seat) => {   
        const obj = {
          Price: ticketPrice,
          Row: seat.row,
          Seat: seat.col,
          FkMovieSession: session_id,
          FkShoppingCart: cart_id,
        };
  
        promises.push(
          axios
            .post('https://localhost:7241/AddReservation', obj)
            .then((res) => {
              
            })
            .catch((err) => {
              console.error('Error reserving seats:', err);
            })
        );
      });
    } else {
      seats.forEach((seatRow) => {
        seatRow.forEach((seat)=>{

          if(seat.status != "reserved"){
            const obj = {
              Price: ticketPrice,
              Row: seat.row,
              Seat: seat.col,
              FkMovieSession: session_id,
              FkShoppingCart: cart_id,
            };
            const selected = seat.status === "selected";
  
            promises.push(
              axios
                .post(`https://localhost:7241/ChangeReservation?selected=${selected}`, obj)
                .then((res) => {

                })
                .catch((err) => {
                  console.error('Error reserving seats:', err);
                })
            );
          }

        })
        
      });
    }
  

    Promise.all(promises)
      .then(() => {
        setCount(0);
        setSelectedSeats([]);  
        setCombinedPrice(0);
        navigate(`/revervacija`);
      })
      .catch((err) => {
        console.error('Error with reservation requests:', err);
      });
  };
  


  if (seats.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="seat-selection">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, colIndex) => (
              <div
                key={seat.id}
                className={`seat ${seat.status}`}
                onClick={() => toggleSeat(rowIndex, colIndex)}
              >
                {seat.status === 'reserved' || seat.status === 'selected'
                  ? 'X'
                  : 'O'}
              </div>
            ))}
          </div>
        ))}
        <p>Is viso pasirinkta vietu: {count}</p>
        <p>Kaina: {combinedPrice}</p>
        <button onClick={confirmSeats}>Patvirtinti vietas</button>
      </div>
    </div>
  );
};

export default SeatSelection;
