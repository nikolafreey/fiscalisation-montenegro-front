import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { usePorezi } from '../../../hooks/PoreziHook';

import BezgotovinskiStavkeFieldArray from './BezgotovinskiStavkeFieldArray';
import { useDispatch, useSelector } from 'react-redux';
import { storeBezgotovinskiRacun } from '../../../store/actions/RacuniActions';
import BezgotovinskiPorezi from './BezgotovinskiPorezi';
import BezgotovinskiUkupno from './BezgotovinskiUkupno';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';
import BezgotovinskiHeader from './BezgotovinskiHeader';

import { RACUNI } from '../../../constants/routes';
import { useHistory } from 'react-router-dom';

const Bezgotovinski = () => {
  const dispatch = useDispatch();
  // const racuni = useSelector(racuniSelector());
  const history = useHistory();

  // const { params } = useRouteMatch();

  const handleSubmit = (values) => {
    const noviRacun = {
      ...values,
      vrsta_racuna: 'bezgotovinski',
      popust_procenat: values.tip_popusta === 'procenat' ? values.popust : null,
      popust_iznos: values.tip_popusta === 'iznos' ? values.popust : null,
      popust_na_cijenu_bez_pdv: values.popust_bez_pdv,
      datum_izdavanja: values.datum_izdavanja?.toISOString().split('T')[0],
      datum_za_placanje: values.datum_za_placanje?.toISOString().split('T')[0],
      datum_uplate: values.datum_uplate?.toISOString().split('T')[0],
      korektivni_racun: values.korektivni_racun === '0' ? 0 : 1,
      korektivni_racun_vrsta:
        values.korektivni_racun === '0' ? null : values.korektivni_racun,
    };

    dispatch(storeBezgotovinskiRacun(noviRacun));
    history.push(`/racuni`);
  };

  // const {
  //   getStopaPerId,
  //   getPriceVat,
  //   getPriceNoVat,
  //   getVat,
  //   porezi,
  // } = usePorezi();

  const today = new Date();
  const seven_days = new Date();
  seven_days.setDate(seven_days.getDate() + 7);

  return (
    <Formik
      initialValues={{
        stavke: [],
        korektivni_racun: '0',
        datum_izdavanja: today,
        datum_za_placanje: seven_days,
        pdv_obveznik: 1,
      }}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values }) => (
        <Form>
          <div className="screen-content">
            <Link to={RACUNI.INDEX} className="back-link df">
              <LinkSvg /> <p>Povratak na Račune</p>
            </Link>

            <h1 className="heading-primary">
              Kreiraj novi bezgotovinski račun
            </h1>

            <BezgotovinskiHeader />

            {/* STAVKE */}
            <h2 className="heading-secondary">Stavke</h2>
            <div className="main-content__box" style={{ display: 'block' }}>
              <div className="main-content__box--header">
                <div className="row">
                  <div className="col-xl-4">
                    <h4 className="heading-quaternary">Naziv usluge / robe</h4>
                  </div>
                  <div className="col-xl-2">
                    <h4 className="heading-quaternary">jedinična cijena</h4>
                  </div>
                  <div className="col-xl-2">
                    <h4 className="heading-quaternary">JM / Količina</h4>
                  </div>
                  <div className="col-xl-2">
                    <h4 className="heading-quaternary">PDV stopa</h4>
                  </div>
                  <div className="col-xl-2">
                    <h4 className="heading-quaternary txt-right">
                      Tip Popusta/iznos
                    </h4>
                  </div>
                </div>
              </div>
              <FieldArray name="stavke">
                {(arrayHelpers) => (
                  <BezgotovinskiStavkeFieldArray {...arrayHelpers} />
                )}
              </FieldArray>
            </div>
            {/* STAVKE */}

            <BezgotovinskiPorezi />
            <BezgotovinskiUkupno />

            {/* STAS I PODSJETNICI */}
            <h2 className="heading-secondary">Status i podsjetnici</h2>
            <div className="main-content__box">
              <div className="form">
                <div className="content pt-12"></div>
                <BezgotovinskiStatusPodsjetnici />
                <div className="form__footer">
                  <button
                    onClick={() => handleSubmit(values)}
                    className="btn btn__dark"
                  >
                    Fiskalizuj i Pošalji
                  </button>
                  <button
                    onClick={() => handleSubmit(values)}
                    className="btn btn__transparent ml-m"
                  >
                    Sačuvaj kao privremeni
                  </button>
                  <button className="btn btn__link ml-m">Obustavi</button>
                </div>
              </div>
            </div>
            {/* STAS I PODSJETNICI */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Bezgotovinski;
