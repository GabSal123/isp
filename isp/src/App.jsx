import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import Reservations from './gabrielius/pages/Reservations'
import SeansuLangas from './gabrielius/pages/SeansuLangas';
import DisplayReservation from './gabrielius/components/DisplayReservation';
import RezervacijosKurimoLangas from './gabrielius/pages/RevervacijosKurimoLangas';
import FilmoLangasGabrielius from './gabrielius/pages/FilmoLangasGabrielius';
import RezervacijuLangas from './gabrielius/pages/RezervacijuLangas';
import RezervacijosInformacinisLangas from './gabrielius/pages/RezervacijosInformacinisLangas';
import MokejimoLangas from './gabrielius/pages/MokejimoLangas';
import Registracija from './Titas/pages/Registracija';
import Prisijungimas from './Titas/pages/Prisijungimas';
import Profilis from './Titas/pages/Profilis';
import DisplayProfile from './Titas/components/DisplayUser';
import PirkiniuIstorija from './Justina/pages/PirkiniuIstorija';
import KrepselioLangas from './Justina/pages/KrepselioLangas';
import FilmuIstorija from './Titas/pages/FilmuIstorija';
import DisplayFilm from './Titas/components/DisplayFilm';
import ProfilioRedagavimas from './Titas/pages/ProfilioRedagavimas';
import VerifyEmail from './Titas/components/VerifyEmail';
import VerifyLogin from './Titas/components/VerifyLogin';
import PrekesLangas from './Justina/pages/PrekesLangas';
import PrekiuSarasas from './Justina/pages/PrekiuSarasas';

// Manfredas Lamsargis IFF-2/5
import FilmoFormosLangas from './manfredas/pages/FilmoFormosLangas'
import FilmoLangas from './manfredas/pages/FilmoLangas'
import FilmoRedagavimoFormosLangas from './manfredas/pages/FilmoRedagavimoFormosLangas';
import FilmoVertinimoFormosLangas from './manfredas/pages/FilmoVertinimoFormosLangas';
import PagrindinisFilmuLangas from './manfredas/pages/PagrindinisFilmuLangas';



function App() {

  return (
    <Router>

      <Routes>

      <Route path="/FilmoLangasGabrielius" element={<Reservations/>}/>

      <Route path="/filmas/:id" element={<FilmoLangasGabrielius/>}/>
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

      
      <Route path="/" element={<PagrindinisFilmuLangas/>}/>
      <Route path="/FilmoVertinimoFormosLangas" element={<FilmoVertinimoFormosLangas/>}/>
      <Route path="/FilmoRedagavimoFormosLangas" element={<FilmoRedagavimoFormosLangas/>}/>
      <Route path="/FilmoLangas" element={<FilmoLangas/>}/>
      <Route path="/FilmoFormosLangas" element={<FilmoFormosLangas/>}/>


      <Route path="/FilmuIstorija" element={<FilmuIstorija/>}/>
      <Route path="/ProfilioRedagavimas" element={<ProfilioRedagavimas/>}/>
      <Route path="/VerifyEmail" element={<VerifyEmail/>} />
      <Route path="/VerifyLogin" element={<VerifyEmail/>} />

      <Route path="/Preke/:id" element={<PrekesLangas/>}/>
      <Route path="/PrekiuSarasas" element={<PrekiuSarasas/>}/>

      </Routes>



    </Router>

  )
}

export default App
