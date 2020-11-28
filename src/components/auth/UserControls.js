import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTH } from '../../constants/routes';
import { logoutUser } from '../../store/actions/UserActions';
import { userSelector } from '../../store/selectors/UserSelector';

const UserControls = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector());

  return user ? (
    <div>
      <span>Welcome, {user.ime}</span>
      <button onClick={() => dispatch(logoutUser())}>Log out</button>
    </div>
  ) : (
    <div>
      <Link to={AUTH.LOGIN}>Log in</Link>
    </div>
  );
};

export default UserControls;
