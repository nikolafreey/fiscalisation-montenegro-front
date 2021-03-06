import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTH, PODESAVANJA } from '../../constants/routes';
import { logoutUser } from '../../store/actions/UserActions';
import { userSelector } from '../../store/selectors/UserSelector';
import userImage from '../../assets/img/user.jpg';
import userIcon from '../../assets/icon/user.svg';
import loginIcon from '../../assets/icon/login.svg';
import bellIcon from '../../assets/icon/bell.svg';
import {ReactComponent as DefaultAvatar} from '../../assets/icon/user-default-avatar.svg';

import { ReactComponent as PodesavanjaSvg } from '../../assets/icon/hero-podesavanja-dropdown.svg';
import { ReactComponent as LogoutSvg } from '../../assets/icon/logout.svg';

const UserControls = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector());
  /*
  <div className="user-nav">
    <div className="user-nav__icon">
      <svg className='icon icon__dark lg'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    </div>
    <div className="user-nav__profile" id="profile">
      <div className="user-nav__profile--text">
        Branka Jovović
      </div>
      <div className="img-round lg" style="background-image: url(assets/img/user.jpg)">
      </div>
      <div className="drop-down" id="ddl">
        <a href="#">
          <svg className="icon icon__dark md icon__drop-down" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          Profile
        </a>
        <a href="#">
          <svg className="icon icon__dark md icon__drop-down" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Log out
        </a>
      </div>
    </div>
  </div>
*/
  return (
    <div className="user-nav">
      {/* <div className="user-nav__icon">
        <img
          className="icon icon__dark lg"
          src={bellIcon}
          alt="notifications-icon"
        />
      </div> */}
      {user ? (
        <div className="user-nav__profile" id="profile">
          <div className="user-nav__profile--text">
            {user.ime + ' ' + user.prezime}
          </div>
          <div
            className="img-round lg"
            style={{ backgroundImage: `url(${user.avatar})` }}
          >
          <DefaultAvatar /> {/* Ako nema bgImage url-a onda ovaj default avatar*/}
          </div>
          <div className="drop-down" id="ddl">
            <Link to={PODESAVANJA.INDEX}>
              <PodesavanjaSvg />
              Podešavanja
            </Link>
            <Link onClick={() => dispatch(logoutUser())}>
              <LogoutSvg />
              Odjava
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to={AUTH.LOGIN}>Prijava</Link>
        </div>
      )}
    </div>
  );
};

export default UserControls;
