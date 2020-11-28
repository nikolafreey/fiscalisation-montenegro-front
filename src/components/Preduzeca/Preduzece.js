import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getPreduzece } from '../../store/actions/PreduzecaActions';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import PreduzeceDetails from './PreduzeceDetails';

const Preduzece = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const preduzece = useSelector(preduzeceSelector());

  useEffect(() => {
    if (params.id) dispatch(getPreduzece(params.id));
  }, [dispatch, params]);
  return <PreduzeceDetails preduzece={preduzece} />;
};

export default Preduzece;
