import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partneriSelector, partnerSelector } from '../../store/selectors/PartneriSelector';
import { getPartneri, setPartner } from '../../store/actions/PartneriActions';
import PartneriTable from './PartneriTable';
import PartneriDetails from './PartneriDetails';

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());
  const partner = useSelector(partnerSelector());

  console.log(partneri);

  useEffect(() => {
    (async () => {
      dispatch(getPartneri());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (partneri.total > 0) dispatch(setPartner(partneri.data[0]));
  }, [partneri, dispatch]);

  return (
  <>
    <PartneriTable partneri={partneri} />
    <PartneriDetails partner={partner} />
  </>
  );
};

export default Partneri;
