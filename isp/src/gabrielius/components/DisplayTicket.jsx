import { useState } from 'react'
import '../styles//RezervacijosInformacinisLangas.css';

const DisplayTicket = ({row,column, price})=> {

    return (
        <li className="ticket-card">
          <p><strong>Eilė:</strong> {row}</p>
          <p><strong>Vieta:</strong> {column}</p>
          <p><strong>Kaina: </strong>{price}</p>
        </li>
    )
}

export default DisplayTicket
