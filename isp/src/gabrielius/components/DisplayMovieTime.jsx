import { useState } from 'react'


const DisplayMovieTime = ({time,lang,subs,onClick})=> {

  return (

<li onClick={onClick} style={{ display: "flex", gap: "10px" }}>
  <p>{time}</p>
  <p>{lang}</p>
  <p>{subs}</p>
</li>
  )
}

export default DisplayMovieTime
