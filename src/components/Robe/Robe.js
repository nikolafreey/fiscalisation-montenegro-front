import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRobe, setRoba } from '../../store/actions/RobeActions';
import { robeSelector, robaSelector } from '../../store/selectors/RobeSelector';
import FizickaLicaTable from './FizickaLicaTable';
import FizickoLiceDetails from './FizickoLiceDetails';

const Robe = () => {
  const dispatch = useDispatch();

  const robe = useSelector(robeSelector());
  const roba = useSelector(robaSelector());

  useEffect(() => {
    dispatch(getRobe());
  }, [dispatch]);

  useEffect(() => {
    if (robe.total > 0) dispatch(setRoba(robe.data[0]));
  }, [robe, dispatch]);

  return (
    <div className="main-content">
      <FizickaLicaTable fizickaLica={robe} />
      <FizickoLiceDetails fizickoLice={roba} />
    </div>
  );
};

export default Robe;
