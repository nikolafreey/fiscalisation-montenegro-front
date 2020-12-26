import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getPartner } from '../../store/actions/PartneriActions';
import { partnerSelector } from '../../store/selectors/PartneriSelector';
import PartneriDetails from './PartneriDetails';

const Partner = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const partner = useSelector(partnerSelector());
  useEffect(() => {
    if (params.id) dispatch(getPartner(params.id));
  }, [dispatch, params]);
  return <PartneriDetails partner={partner} />;
};

export default Partner;
