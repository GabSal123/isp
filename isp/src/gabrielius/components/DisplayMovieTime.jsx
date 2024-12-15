import { useState } from 'react'


const DisplayMovieTime = ({time,lang,subs,hall,func,onClick})=> {

  return (

<li onClick={onClick} style={{ display: "flex", gap: "10px" }}>
  <p>{time}</p>
  <p>{lang}</p>
  <p>{subs}</p>
  <p>Sale: {hall}</p>
  <p>{func}</p>
</li>
  )
}

export default DisplayMovieTime
