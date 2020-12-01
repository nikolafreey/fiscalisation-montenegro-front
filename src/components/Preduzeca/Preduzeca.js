import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreduzeca, setPreduzece } from '../../store/actions/PreduzecaActions';
import {
  preduzecaSelector,
  preduzeceSelector,
} from '../../store/selectors/PreduzecaSelector';
import PreduzecaTable from './PreduzecaTable';
import PreduzeceDetails from './PreduzeceDetails';

const Preduzeca = () => {
  const dispatch = useDispatch();

  const preduzeca = useSelector(preduzecaSelector());
  const preduzece = useSelector(preduzeceSelector());

  useEffect(() => {
    dispatch(getPreduzeca());
  }, [dispatch]);

  useEffect(() => {
    if (preduzeca.total > 0) dispatch(setPreduzece(preduzeca.data[0]));
  }, [preduzeca, dispatch]);

  return (
    <>
      <PreduzecaTable preduzeca={preduzeca} />
      <PreduzeceDetails preduzece={preduzece} />
    </>
  );
};

export default Preduzeca;
