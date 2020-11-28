import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreduzeca } from '../../store/actions/PreduzecaActions';
import { preduzecaSelector } from '../../store/selectors/PreduzecaSelector';
import PreduzecaTable from './PreduzecaTable';

const Preduzeca = () => {
  const dispatch = useDispatch();

  const preduzeca = useSelector(preduzecaSelector());

  useEffect(() => {
    dispatch(getPreduzeca());
  }, [dispatch]);
  return <PreduzecaTable preduzeca={preduzeca} />;
};

export default Preduzeca;
