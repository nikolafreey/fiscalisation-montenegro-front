import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
import RacunDetails from './RacuniDetails';
import { getRacun } from '../../../store/actions/RacuniActions';

const Racun = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const racun = useSelector(racunSelector());

  useEffect(() => {
    if (params.id) dispatch(getRacun(params.id));
  }, [dispatch, params]);
  return <RacunDetails racun={racun} />;
};

export default Racun;
