import { useState } from 'react'
import '../styles//RezervacijosInformacinisLangas.css';

const DisplayTicket = ({cinema,row,column})=> {

    return (
        <li className="ticket-card">
          <p><strong>Sale:</strong> {cinema}</p>
          <p><strong>Eilė:</strong> {row}</p>
          <p><strong>Vieta:</strong> {column}</p>
        </li>
    )
}

export default DisplayTicket
