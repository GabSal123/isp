import { useState } from 'react'


const DisplayReservation = ({name,cost,onClick})=> {

  return (

    <li onClick={onClick}>
        <p>{name}</p>
        <p>{cost}</p>
    </li>
  )
}

export default DisplayReservation
