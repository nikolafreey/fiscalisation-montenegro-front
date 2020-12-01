import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFizickaLica, setFizickoLice } from '../../store/actions/FizickaLicaActions';
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

  useEffect(() => {
    if (fizickaLica.total > 0) dispatch(setFizickoLice(fizickaLica.data[0]));
  }, [fizickaLica, dispatch]);

  return (
    <div>
      <FizickaLicaTable fizickaLica={fizickaLica} />
      <FizickoLiceDetails fizickoLice={fizickoLice} />
    </div>
  );
};

export default FizickaLica;
