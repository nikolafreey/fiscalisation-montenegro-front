import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTH } from '../../constants/routes';
import { logoutUser } from '../../store/actions/UserActions';
import { userSelector } from '../../store/selectors/UserSelector';
import userImage from '../../assets/img/user.jpg';
import userIcon from '../../assets/icon/user.svg';
import loginIcon from '../../assets/icon/login.svg';
import bellIcon from '../../assets/icon/bell.svg';

const UserControls = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector());

  return (
    <div class="user-nav">
      <div class="user-nav__icon">
        <img src={bellIcon} alt="notifications-icon" />
      </div>
      {user ? (
        <>
          <div class="user-nav__text">Branka Jovović</div>
          <div
            class="user-nav__img"
            style={{backgroundImage: `url(${userImage})`}}
          >
            <ul class="drop-down" id="ddl">
              <li>
                <img src={userIcon} alt="profile" />
                <span>Profile</span>
              </li>
              <li>
                <img src={loginIcon} alt="logout" />
                <span onClick={() => dispatch(logoutUser())}> Log out</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div>
          <Link to={AUTH.LOGIN}>Log in</Link>
        </div>
      )}
    </div>
  );
};

export default UserControls;
