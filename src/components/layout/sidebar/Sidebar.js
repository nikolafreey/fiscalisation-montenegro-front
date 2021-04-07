import React from 'react';
import {
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDRACUNI,
  PREDUZECA,
  RACUNI,
  ULAZNI_RACUNI,
  USLUGE,
  STAVKE,
  MODULI,
  PODESAVANJA,
} from '../../../constants/routes';
import SidebarLink from './SidebarLink';
import { ReactComponent as heroHome } from '../../../assets/icon/hero-home.svg';
import { ReactComponent as heroRacuni } from '../../../assets/icon/hero-racuni.svg';
import { ReactComponent as heroUlazniRacuni } from '../../../assets/icon/hero-prijem_racuna.svg';
import { ReactComponent as heroPartneri } from '../../../assets/icon/hero-partneri.svg';
import { ReactComponent as heroPreduzeca } from '../../../assets/icon/hero-preduzeca.svg';
import { ReactComponent as heroStavke } from '../../../assets/icon/hero-stavke.svg';
import { ReactComponent as heroPredracuni } from '../../../assets/icon/hero-predracuni.svg';
import { ReactComponent as heroDokumenta } from '../../../assets/icon/hero-dokumenta.svg';
import { ReactComponent as heroIzvjestaji } from '../../../assets/icon/hero-izvjestaji.svg';
import { ReactComponent as heroModuli } from '../../../assets/icon/hero-moduli.svg';
import { ReactComponent as heroNovosti } from '../../../assets/icon/hero-novosti.svg';
import { ReactComponent as heroRazgovori } from '../../../assets/icon/hero-razgovori.svg';
import { ReactComponent as heroUgovori } from '../../../assets/icon/hero-ugovori.svg';
import { ReactComponent as heroPodesavanja } from '../../../assets/icon/hero-podesavanja.svg';
import { ReactComponent as heroPodrska } from '../../../assets/icon/hero-podrska.svg';

const Sidebar = () => {
  return (
    <div className="col-md-1 col-xl-3" id="sidebar">
      <div className="logo dshow">računi</div>
      <div className="menu-icon">
        <span className="line line-1"></span>
        <span className="line line-2"></span>
      </div>
      <div className="sidebar">
        <ul className="items">
          <SidebarLink ImageSource={heroHome} label="Pregled" to={HOME} />
          {/* <SidebarLink ImageSource={heroRazgovori} label="Razgovori" to={'#'} />
          <SidebarLink ImageSource={heroNovosti} label="Novosti" to={'#'} /> */}
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Računi</h3>
          <SidebarLink
            ImageSource={heroRacuni}
            label="Računi"
            to={RACUNI.INDEX}
          />
          <SidebarLink
            ImageSource={heroPredracuni}
            label="Predračuni"
            to={PREDRACUNI.INDEX}
          />
          <SidebarLink
            ImageSource={heroUlazniRacuni}
            label="Prijem računa"
            to={ULAZNI_RACUNI.INDEX}
          />
          <SidebarLink
            ImageSource={heroStavke}
            label="Stavke"
            to={STAVKE.INDEX}
          />
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Partneri</h3>
          <SidebarLink
            ImageSource={heroPartneri}
            label="Partneri"
            to={PARTNERI.INDEX}
          />
          {/* <SidebarLink ImageSource={heroUgovori} label="Ugovori" to={'#'} /> */}

          {/* <SidebarLink ImageSource={heroDokumenta} label="Dokumenta" to={'#'} /> */}
          <SidebarLink
            ImageSource={heroPreduzeca}
            label="Preduzeca"
            to={PREDUZECA.INDEX}
          />
          <SidebarLink
            ImageSource={heroIzvjestaji}
            label="Izvještaji"
            to={'#'}
          />

          {/* <SidebarLink
            ImageSource={heroHome}
            label="Fizicka lica"
            to={FIZICKA_LICA.INDEX}
          /> */}
        </ul>

        <ul className="items">
          <h3 className="heading-quaternary">Podešavanja</h3>

          <SidebarLink
            ImageSource={heroModuli}
            label="Moduli"
            to={MODULI.INDEX}
          />
          <SidebarLink
            ImageSource={heroPodesavanja}
            label="Podešavanja"
            to={PODESAVANJA.INDEX}
          />
          {/* <SidebarLink ImageSource={heroPodrska} label="Podrška" to={'#'} /> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
