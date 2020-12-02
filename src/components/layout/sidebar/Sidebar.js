import React from 'react';
import {
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDUZECA,
  USLUGE,
} from '../../../constants/routes';
import SidebarLink from './SidebarLink';
import '../../../main.scss';
import heroHome from '../../../assets/icon/hero-home.svg';
import heroPartneri from '../../../assets/icon/hero-partneri.svg';
import heroPreduzeca from '../../../assets/icon/hero-preduzeca.svg';
import heroStavke from '../../../assets/icon/hero-stavke.svg';


const Sidebar = () => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <div class="logo">računi</div>
        <ul className="items">
          <SidebarLink
            imageSource={heroHome}
            label="Pregled"
            to={HOME}
          />
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Partneri</h3>
          <SidebarLink
            imageSource={heroHome}
            label="Fizicka lica"
            to={FIZICKA_LICA.INDEX}
          />
          <SidebarLink
            imageSource={heroPreduzeca}
            label="Preduzeca"
            to={PREDUZECA.INDEX}
          />
          <SidebarLink
            imageSource={heroPartneri}
            label="Partneri"
            to={PARTNERI.INDEX}
          />
          <SidebarLink
            imageSource={heroStavke}
            label="Stavke"
            to={USLUGE.INDEX}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
