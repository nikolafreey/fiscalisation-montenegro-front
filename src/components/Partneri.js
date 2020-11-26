import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/AuthService';
import { partneriSelector } from '../store/selectors/PartneriSelector';
import $t from '../lang';
import PartneriForm from './FizickaLica/PartneriForm';
import { getPartneri } from '../store/actions/PartneriActions';

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());

  console.log(partneri);

  useEffect(() => {
    (async () => {
      //await authService.getCsrfCookie();
      //await authService.login('aj.jokic@gmail.com', 'password');
      dispatch(getPartneri());
    })();
  }, [dispatch]);

  return (
    <div>
      <PartneriForm />
    </div>
  );
};

export default Partneri;
