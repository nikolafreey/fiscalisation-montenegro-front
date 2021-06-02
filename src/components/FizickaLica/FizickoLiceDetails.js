import React from 'react';
// import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';

const FizickoLiceDetails = ({ fizickoLice = {} }) => {
  let a = '';
  const ziroRacuni = () => {
    return fizickoLice?.ziro_racuni?.map((racun) => {
      a = racun.broj_racuna;
      if (a) {
        const prvaTri = a.substring(0, 3);

        if (prvaTri.includes('550')) {
          return <p>{'Podgorička' + a}</p>;
        } else if (prvaTri.includes('535')) {
          return <p>{'Prva' + a}</p>;
        } else if (prvaTri.includes('555')) {
          return <p>{'Addiko' + a}</p>;
        } else if (prvaTri.includes('510')) {
          return <p>{'CKB ' + a}</p>;
        } else if (prvaTri.includes('530')) {
          return <p>{'Montenegro AD' + a}</p>;
        } else if (prvaTri.includes('540')) {
          return <p>{'ERSTE' + a}</p>;
        } else if (prvaTri.includes('520')) {
          return <p>{'Hipotekarna' + a}</p>;
        }
        return <p>{a}</p>;
      }
    });
  };

  let avatar;
  console.log(fizickoLice.avatar);
  if (fizickoLice.avatar) {
    avatar = (
      <div className="side-info__logo-wrapper">
        <img
          src={fizickoLice.avatar}
          alt=""
          className="side-info__logo img-round xl"
        />
      </div>
    );
  }
  return (
    <div className="side-info">
      {/* <div className="side-info__logo-wrapper">
        <img
          src={fizickoLice.avatar}
          alt=""
          className="side-info__logo img-round xl"
        />
      </div> */}
      {avatar}
      <div className="side-info__wrapper">
        <h2 className="side-info__title">
          {fizickoLice.ime + ' ' + fizickoLice.prezime}
        </h2>
      </div>
      <div className="side-info__desc">
        <ul className="list">
          <li className="item cl">{fizickoLice.zanimanje}</li>
          <li className="item cl">{fizickoLice.adresa}</li>
          <li className="item cl">
            {fizickoLice.grad}, {fizickoLice.drzava}
          </li>
        </ul>
        {/* <p className="lh-sm">
          Elementum malesuada tristique vitae ut. Nunc parturient natoque nulla
          molestie sed cursus. Risus congue quisque morbi nibh mauris vel.
        </p> */}
      </div>
      <div className="side-info__wrapper">
        <div className="side-info__info as-end">
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">jmbg</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.jmbg}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">ib</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.ib}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>Nacionalnost</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.nacionalnost}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>Državljanstvo</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.drzavljanstvo}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>Preduzeće</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.preduzece?.kratki_naziv}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>Radno mjesto</p>
            </div>
            <div className="col-r">
              <p>{fizickoLice.radno_mjesto}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="side-info__map mt-20"
        style={{ bacgroundImage: `url('assets/img/map.jpg')` }}
      ></div>

      <hr className="mtb-20" />
      <div className="side-info__wrapper">
        <h3 className="heading-tertiary">Tekući računi</h3>
        <div className="side-info__info">
          <div className="side-info__info--inner-wrapper">
            <div className="col-r">{ziroRacuni()}</div>
          </div>
        </div>
      </div>
      <hr className="mtb-20" />
      <div className="side-info__wrapper">
        <h3 className="heading-tertiary">Kontakt informacije</h3>
      </div>
      <div className="side-info__info">
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <div>Telefon</div>
          </div>
          <div className="col-r">
            <p>
              <a href={`tel:${fizickoLice.telefon}`}>{fizickoLice.telefon}</a>
            </p>
            {/*<div className="df ai-c jc-end">
            <p>WhatsApp</p>
            {fizickoLice.telefon_whatsapp && <CheckIcon className="icon icon__dark sm" />}
          </div>
          <div className="df ai-c jc-end">
            <p>Viber</p>
            {fizickoLice.telefon_viber && <CheckIcon className="icon icon__dark sm" />}
          </div>
          <div className="df ai-c jc-end">
            <p>Facetime</p>
            {fizickoLice.telefon_facetime && <CheckIcon className="icon icon__dark sm" />}
          </div>*/}
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>Email</p>
          </div>
          <div className="col-r">
            <p>
              <a href={`mailto:${fizickoLice.email}`}>{fizickoLice.email}</a>
            </p>
          </div>
        </div>
        {fizickoLice.cv_link && (
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>CV</p>
            </div>
            <div className="col-r">
              <p>
                <a
                  href={fizickoLice.cv_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pogledaj CV
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FizickoLiceDetails;
