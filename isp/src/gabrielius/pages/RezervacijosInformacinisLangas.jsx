import { useState } from 'react'
import { useParams } from 'react-router-dom';
import DisplayTicket from '../components/DisplayTicket';
import '../styles//RezervacijosInformacinisLangas.css';

const RezervacijosInformacinisLangas = ()=> {
    const { id } = useParams();
    const reservation = {
        movie: "Titanikas",
        cost: 12

    }

    const tickets = [{id:0,cinema:"12",row:"A15",column:16},
        {id:1,cinema:"12",row:"A15",column:17},
        {id:2,cinema:"12",row:"A15",column:18},
    ]


    return (
        <div className="reservation-info-container">
          <h1 className="reservation-title">Rezervacijos Informacija</h1>
          <div className="reservation-details">
            <p>Filmas: <strong>{reservation.movie}</strong></p>
            <p>Kaina: <strong>{reservation.cost}€</strong></p>
          </div>
          <ul className="ticket-list">
            {tickets.map((ticket, index) => (
              <DisplayTicket
                key={index}
                cinema={ticket.cinema}
                row={ticket.row}
                column={ticket.column}
              />
            ))}
          </ul>
        </div>
      );
}

export default RezervacijosInformacinisLangas
