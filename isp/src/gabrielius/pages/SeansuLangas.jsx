import { useNavigate } from 'react-router-dom';
import "../styles/resstyles.css"
import { useState } from 'react'
import DisplayMovieTime from '../components/DisplayMovieTime';
import { useParams } from 'react-router-dom';

const SeansuLangas = ()=> {
    const { id } = useParams();
    const reservation = {id: id,movie: "Titanikas",cost: 12}

    const dates = [
        "2024-01-01",
        "2024-01-15",
        "2024-02-01",
        "2024-02-15",
        "2024-03-01",
      ];

    const [selectedDate, setSelectedDate] = useState("");
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

      const navigate = useNavigate();
      const handleResClick = (id) => {
        console.log(id)
        navigate(`/seansas/${id}`);
    };

    const movies = [{id:0,time: "13:30", language: "LT", subs: "No subs"},
        {id:1,time: "18:30", language: "EN", subs: "LT subs"},
        {id:2,time: "21:00", language: "LT", subs: "No subs"},
        {id:3,time: "22:00", language: "UKR", subs: "LT subs"}
     ]

  return (
    <div className="container-reservation-1">
  <div className="left-section">
    <h1>{reservation.movie}</h1>
    <div className="imagediv"></div>
  </div>
  <div className="right-section">
    <select id="date-select" value={selectedDate} onChange={handleDateChange}>
      <option value="">-- Choose a date --</option>
      {dates.map((date, index) => (
        <option key={index} value={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </option>
      ))}
    </select>
    <ul>
      {movies.map((movie, index) => (
        <DisplayMovieTime
          key={index}
          time={movie.time}
          lang={movie.language}
          subs={movie.subs}
          onClick={()=>handleResClick(movie.id)}
        />
      ))}
    </ul>

  </div>
</div>
  )
}

export default SeansuLangas
