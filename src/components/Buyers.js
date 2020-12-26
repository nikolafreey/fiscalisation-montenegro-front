import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fizickaLicaSelector } from '../store/selectors/FizickaLicaSelector';
import FizickaLicaForm from './FizickaLica/FizickaLicaForm';
import { getFizickaLica } from '../store/actions/FizickaLicaActions';

const Buyers = () => {
  const dispatch = useDispatch();

  const fizicka_lica = useSelector(fizickaLicaSelector());

  useEffect(() => {
    (async () => {
      //await authService.getCsrfCookie();
      //await authService.login('aj.jokic@gmail.com', 'password');
      dispatch(getFizickaLica());
    })()
  }, [dispatch])
  
  
  return (
    <div>
      <FizickaLicaForm/>
    </div>
  )
}

export default Buyers

