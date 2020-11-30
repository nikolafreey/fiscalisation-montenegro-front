import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFizickaLica } from '../../store/actions/FizickaLicaActions';
import { fizickaLicaSelector, fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import FizickaLicaTable from './FizickaLicaTable';
import FizickoLiceDetails from './FizickoLiceDetails';

const FizickaLica = () => {
  const dispatch = useDispatch();

  const fizickaLica = useSelector(fizickaLicaSelector());
  const fizickoLice = useSelector(fizickoLiceSelector());

  useEffect(() => {
    dispatch(getFizickaLica());
  }, [dispatch]);

  return (
    <div>
      <FizickaLicaTable fizickaLica={fizickaLica} />
      <FizickoLiceDetails fizickoLice={fizickoLice} />
    </div>
  );
};

export default FizickaLica;
