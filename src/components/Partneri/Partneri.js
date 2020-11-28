import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../services/AuthService';
import { partneriSelector } from '../../store/selectors/PartneriSelector';
import $t from '../../lang';
import { getPartneri } from '../../store/actions/PartneriActions';
import PartneriTable from './PartneriTable';

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());

  console.log(partneri);

  useEffect(() => {
    (async () => {
      dispatch(getPartneri());
    })();
  }, [dispatch]);

  return <PartneriTable partneri={partneri} />;
};

export default Partneri;
