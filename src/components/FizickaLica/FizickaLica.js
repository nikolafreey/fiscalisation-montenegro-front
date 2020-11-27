import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFizickaLica } from '../../store/actions/FizickaLicaActions';
import { fizickaLicaSelector } from '../../store/selectors/FizickaLicaSelector';
import FizickaLicaTable from './FizickaLicaTable';

const FizickaLica = () => {
  const dispatch = useDispatch();

  const fizickaLica = useSelector(fizickaLicaSelector());

  useEffect(() => {
    dispatch(getFizickaLica());
  }, [dispatch]);
  
  return <FizickaLicaTable fizickaLica={fizickaLica} />
}

export default FizickaLica
