import { useNavigate } from 'react-router-dom';
import "../styles/resstyles.css"
import { useEffect, useState } from 'react'
import DisplayMovieTime from '../components/DisplayMovieTime';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SeansuLangas = ()=> {
    const { id } = useParams();
    const [dates,setDates] = useState([])
    const [movie, setMovie] = useState({title:""})
    const [movieImage, setMovieImage] = useState("")
    const [selectedDate, setSelectedDate] = useState("");
    const [times, setTimes] = useState([]);

    useEffect(()=>{
      const request = axios.get(`https://localhost:7241/GetMovie?id=${id}`).then((res) => res.data)
    .then((data) => {
      setMovie(data)
      const movie_image = `/src/movie_images/${data.title}.jpg`
      setMovieImage(movie_image)
    })
    .catch((e) => {
      console.log(e)
    });
   },[])

    useEffect(()=>{
      axios.get(`https://localhost:7241/GetDates?id=${id}`).then((res)=>{
        setDates(res.data)
      })
    },[])




    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

      const navigate = useNavigate();
      const handleResClick = (id) => {
        console.log(id)
        navigate(`/seansas/${id}/create`);
    };


    useEffect(()=>{
      axios.get(`https://localhost:7241/GetTimes?id=1&date=${selectedDate}`).then((res)=>{
        console.log("pasikeicia laikai")
        setTimes(res.data)
      }).catch(()=>{setTimes([])})
    },[selectedDate])

    return (
      <div className="container-reservation-1">
        <div className="left-section">
          <h1>{movie.title}</h1>
          <div className="imagediv">
            <img src={movieImage} alt="Movie" width="300px" height="100%" />
          </div>
        </div>
        <div className="right-section">
          <div className="dropdown-container">
            <label htmlFor="date-select">Select a date:</label>
            <select
              id="date-select"
              value={selectedDate}
              onChange={handleDateChange}
              className="styled-select"
            >
              <option value="">-- Choose a date --</option>
              {dates.map((date, index) => (
                <option key={index} value={date.day}>
                  {new Date(date.day).toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>
          <ul className="times-list">
            {times.map((time, index) => (
              <DisplayMovieTime
                key={index}
                time={time.time}
                lang={time.language}
                subs={time.subs}
                hall={time.hall}
                func={time.func}
                onClick={() => handleResClick(time.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
}

export default SeansuLangas
