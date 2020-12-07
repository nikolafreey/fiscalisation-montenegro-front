import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { RobeDetails } from './RobeDetails';
import { getRoba } from '../../store/actions/RobeActions';
import { robaSelector } from '../../store/selectors/RobeSelector';

const Roba = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const roba = useSelector(robaSelector());

  useEffect(() => {
    if (params.id) dispatch(getRoba(params.id));
  }, [dispatch, params]);
  return <RobeDetails roba={roba} />;
};

export default Roba;
