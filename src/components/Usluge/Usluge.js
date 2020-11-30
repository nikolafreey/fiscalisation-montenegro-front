import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsluge, setUsluga } from '../../store/actions/UslugeActions';
import {
  uslugeSelector,
  uslugaSelector,
} from '../../store/selectors/UslugeSelector';
import UslugeTable from './UslugeTable';
import UslugaDetails from './UslugaDetails';

const Usluge = () => {
  const dispatch = useDispatch();

  const usluge = useSelector(uslugeSelector());
  const usluga = useSelector(uslugaSelector());

  useEffect(() => {
    dispatch(getUsluge());
  }, [dispatch]);

  useEffect(() => {
    if (usluge.total > 0) dispatch(setUsluga(usluge.data[0]));
  }, [usluge, dispatch]);

  return (
    <>
      <UslugeTable usluge={usluge} />
      <UslugaDetails usluga={usluga} />
    </>
  );
};

export default Usluge;
