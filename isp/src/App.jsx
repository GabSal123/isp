import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import Reservations from './gabrielius/pages/Reservations'
import SeansuLangas from './gabrielius/pages/SeansuLangas';
import DisplayReservation from './gabrielius/components/DisplayReservation';
import RezervacijosKurimoLangas from './gabrielius/pages/RevervacijosKurimoLangas';
import FilmoLangas from './gabrielius/pages/FilmoLangas';
import RezervacijuLangas from './gabrielius/pages/RezervacijuLangas';
import RezervacijosInformacinisLangas from './gabrielius/pages/RezervacijosInformacinisLangas';
import MokejimoLangas from './gabrielius/pages/MokejimoLangas';
import Registracija from './Titas/pages/Registracija';
import Prisijungimas from './Titas/pages/Prisijungimas';
import Profilis from './Titas/pages/Profilis';
import DisplayProfile from './Titas/components/DisplayUser';

function App() {

  return (
    <Router>

      <Routes>

      <Route path="/" element={<Reservations/>}/>
      <Route path="/filmas/:id" element={<FilmoLangas/>}/>
      <Route path="/seansai/:id" element={<SeansuLangas/>}/>
      <Route path="/revervacija/:id" element={<RezervacijuLangas/>}/>
      <Route path="/revervacijosinfo/:id" element={<RezervacijosInformacinisLangas/>}/>
      <Route path="/seansas/:id" element={<RezervacijosKurimoLangas/>}/>
      <Route path="/mokejimas" element={<MokejimoLangas/>}/>
      <Route path="/Registracija" element={<Registracija/>}/>
      <Route path="/Prisijungimas" element={<Prisijungimas/>}/>
      <Route path="/Profilis" element={<Profilis/>}/>

      </Routes>



    </Router>

  )
}

export default App
