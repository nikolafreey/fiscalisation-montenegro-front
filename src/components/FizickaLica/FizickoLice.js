import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getFizickoLice } from '../../store/actions/FizickaLicaActions';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import FizickoLiceDetails from './FizickoLiceDetails';

const FizickoLice = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const fizickoLice = useSelector(fizickoLiceSelector());

  useEffect(() => {
    if (params.id) dispatch(getFizickoLice(params.id));
  }, [dispatch, params]);
  return <FizickoLiceDetails fizickoLice={fizickoLice}/>
}

export default FizickoLice
