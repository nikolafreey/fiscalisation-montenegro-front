import React from 'react';
import {
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDRACUNI,
  PREDUZECA,
  RACUNI,
  ROBE,
  USLUGE,
} from '../../../constants/routes';
import SidebarLink from './SidebarLink';
import { ReactComponent as heroHome } from '../../../assets/icon/hero-home.svg';
import { ReactComponent as heroPartneri } from '../../../assets/icon/hero-partneri.svg';
import { ReactComponent as heroPreduzeca } from '../../../assets/icon/hero-preduzeca.svg';
import { ReactComponent as heroStavke } from '../../../assets/icon/hero-stavke.svg';
import { ReactComponent as heroPredracuni } from '../../../assets/icon/hero-predracuni.svg';

const Sidebar = () => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <div className="logo">računi</div>
        <ul className="items">
          <SidebarLink ImageSource={heroHome} label="Pregled" to={HOME} />
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Partneri</h3>
          <SidebarLink
            ImageSource={heroHome}
            label="Fizicka lica"
            to={FIZICKA_LICA.INDEX}
          />
          <SidebarLink
            ImageSource={heroPreduzeca}
            label="Preduzeca"
            to={PREDUZECA.INDEX}
          />
          <SidebarLink
            ImageSource={heroPartneri}
            label="Partneri"
            to={PARTNERI.INDEX}
          />
          <SidebarLink
            ImageSource={heroStavke}
            label="Stavke"
            to={USLUGE.INDEX}
          />
          <SidebarLink
            ImageSource={heroStavke}
            label="Računi"
            to={RACUNI.INDEX}
          />
          <SidebarLink
            ImageSource={heroPredracuni}
            label="Predračuni"
            to={PREDRACUNI.INDEX}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
