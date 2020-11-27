import React from 'react'

const FizickoLiceDetails = ({fizickoLice}) => {
  
  return (
    <div>
      <p>{fizickoLice.ime}</p>
      <p>{fizickoLice.prezime}</p>
      <p>{fizickoLice.jmbg}</p>
      <p>{fizickoLice.ib}</p>
      <p>{fizickoLice.adresa}</p>
      <p>{fizickoLice.telefon}</p>
      <p>{fizickoLice.email}</p>
      <p>{fizickoLice.zanimanje}</p>
      <p>{fizickoLice.radno_mjesto}</p>
      <p>{fizickoLice.drzavljanstvo}</p>
      <p>{fizickoLice.nacionalnost}</p>
      <p>{fizickoLice.cv_link}</p>
      <p>{fizickoLice.avatar}</p>
      <p>{fizickoLice.preduzece_id}</p>
    </div>
  )
}

export default FizickoLiceDetails
