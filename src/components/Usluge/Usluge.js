import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsluge } from '../../store/actions/UslugeActions';
import { uslugeSelector } from '../../store/selectors/UslugeSelector';
import UslugeTable from './UslugeTable';

const Usluge = () => {
  const dispatch = useDispatch();

  const usluge = useSelector(uslugeSelector());

  useEffect(() => {
    dispatch(getUsluge());
  }, [dispatch]);

  return <UslugeTable usluge={usluge} />;
};

export default Usluge;
