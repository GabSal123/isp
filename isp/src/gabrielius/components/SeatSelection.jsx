import React, { useState } from 'react';
import '../styles/SeatSelection.css';

const SeatSelection = () => {

  const rows = 6; 
  const cols = 10; 

  const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${rowIndex}-${colIndex}`,
      status: 'available',
    }))
  );
  const [count,setCount] = useState(0)
  const [seats, setSeats] = useState(initialSeats);

  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if(seat.status != "reserved"){
                return {
                    ...seat,
                    status: seat.status === 'available' ? 'selected' : 'available',
                  };
            }

          }
          return seat;
        })
      );
      let c = 0
        updatedSeats.forEach(row=>{
          row.forEach(s=>{
            if(s.status === "selected"){
                c = c + 1
            }
          })

      })
      setCount(c)
      return updatedSeats;
    });
  };

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