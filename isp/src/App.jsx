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
import PirkiniuIstorija from './Justina/pages/PirkiniuIstorija';
import KrepselioLangas from './Justina/pages/KrepselioLangas';
import PrekesLangas from './Justina/pages/PrekesLangas';
import PrekiuSarasas from './Justina/pages/PrekiuSarasas';


function App() {

  return (
    <Router>

      <Routes>

      <Route path="/" element={<Reservations/>}/>
      <Route path="/filmas/:id" element={<FilmoLangas/>}/>
      <Route path="/seansai/:id" element={<SeansuLangas/>}/>
      <Route path="/revervacija" element={<RezervacijuLangas/>}/>
      <Route path="/revervacijosinfo/:id" element={<RezervacijosInformacinisLangas/>}/>
      <Route path="/seansas/:id/:edit" element={<RezervacijosKurimoLangas/>}/>
      <Route path="/mokejimas" element={<MokejimoLangas/>}/>
      <Route path="/Registracija" element={<Registracija/>}/>
      <Route path="/Prisijungimas" element={<Prisijungimas/>}/>
      <Route path="/Profilis" element={<Profilis/>}/>
      <Route path="/PirkiniuIstorija" element={<PirkiniuIstorija/>}/>
      <Route path="/Krepselis" element={<KrepselioLangas/>}/>
      <Route path="/Preke/:id" element={<PrekesLangas/>}/>
      <Route path="/PrekiuSarasas" element={<PrekiuSarasas/>}/>

      </Routes>



    </Router>

  )
}

export default App
