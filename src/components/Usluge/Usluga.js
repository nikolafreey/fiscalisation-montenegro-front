import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getUsluga } from '../../store/actions/UslugeActions';
import { uslugaSelector } from '../../store/selectors/UslugeSelector';
import UslugaDetails from './UslugaDetails';

const Usluga = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const usluga = useSelector(uslugaSelector());

  useEffect(() => {
    if (params.id) dispatch(getUsluga(params.id));
  }, [dispatch, params]);
  return <UslugaDetails usluga={usluga} />;
};

export default Usluga;
