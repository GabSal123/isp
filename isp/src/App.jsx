import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import Reservations from './gabrielius/pages/Reservations'
import DisplayReservation from './gabrielius/components/DisplayReservation';
import ReservationForm from './gabrielius/pages/ReservationForm';

function App() {

  return (
    <Router>

      <Routes>

      <Route path="/" element={<Reservations/>}/>
      <Route path="/reservation/:id" element={<ReservationForm/>}/>
      </Routes>



    </Router>

  )
}

export default App
