import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/AuthService';
import { getBuyers } from '../store/actions/BuyerActions';
import { fizickaLicaSelector } from '../store/selectors/FizickaLicaSelector';
import $t from '../lang';
import FizickaLicaForm from './FizickaLica/FizickaLicaForm';
import { getFizickaLica } from '../store/actions/FizickaLicaActions';

const Buyers = () => {
  const dispatch = useDispatch();

  const fizicka_lica = useSelector(fizickaLicaSelector());

  console.log(fizicka_lica);

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

