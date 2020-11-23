import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/AuthService';
import { getBuyers } from '../store/actions/BuyerActions';
import { buyerSelector } from '../store/selectors/BuyerSelector';

const Buyers = () => {
  const dispatch = useDispatch();

  const buyers = useSelector(buyerSelector());

  console.log(buyers);

  useEffect(() => {
    (async () => {
      await authService.getCsrfCookie();
      await authService.login('aj.jokic@gmail.com', 'password');
      dispatch(getBuyers());
    })()
  }, [dispatch])
  
  
  return (
    <div>
      
    </div>
  )
}

export default Buyers

