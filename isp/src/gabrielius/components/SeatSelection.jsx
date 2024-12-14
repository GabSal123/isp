import React, { useEffect, useState } from 'react';
import '../styles/SeatSelection.css';
import axios from 'axios';

const SeatSelection = ({ session_id }) => {
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);
  const [seats, setSeats] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://localhost:7241/GetAvailableSeats?sessionId=${session_id}`)
      .then((res) => {
        console.log(session_id, res.data);
        setRows(res.data.number_of_rows);
        setCols(res.data.number_of_columns);
      });
  }, [session_id]);


  useEffect(() => {
    if (rows && cols) {
      const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => ({
          id: `${rowIndex}-${colIndex}`,
          status: 'available',
        }))
      );
      console.log(initialSeats);
      setSeats(initialSeats);
    }
  }, [rows, cols]);


  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if (seat.status !== 'reserved') {
              return {
                ...seat,
                status: seat.status === 'available' ? 'selected' : 'available',
              };
            }
          }
          return seat;
        })
      );

      // Update selected seat count
      let c = 0;
      updatedSeats.forEach((row) => {
        row.forEach((s) => {
          if (s.status === 'selected') {
            c += 1;
          }
        });
      });
      setCount(c);
      return updatedSeats;
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
                {seat.status === 'reserved' ? 'X' : 'O'}
              </div>
            ))}
          </div>
        ))}
        <p>Is viso pasirinkta vietu: {count}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
