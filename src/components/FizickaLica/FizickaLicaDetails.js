import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getFizickoLice } from '../../store/actions/FizickaLicaActions';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';

const FizickaLicaDetails = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const fizickoLice = useSelector(fizickoLiceSelector());

  useEffect(() => {
    if (params.id) dispatch(getFizickoLice(params.id));
  }, [dispatch, params]);
  
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

export default FizickaLicaDetails
