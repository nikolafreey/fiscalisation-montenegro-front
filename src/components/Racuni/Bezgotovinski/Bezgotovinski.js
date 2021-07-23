import { useFormikContext, FieldArray, Form, Formik, Field } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { usePorezi } from '../../../hooks/PoreziHook';

import BezgotovinskiStavkeFieldArrayNovi from './BezgotovinskiStavkeFieldArrayNovi';
import BezgotovinskiStavkeFieldArray from './BezgotovinskiStavkeFieldArray';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRacuni,
  getStavke,
  setRacun,
  storeBezgotovinskiRacun,
} from '../../../store/actions/RacuniActions';
import BezgotovinskiPorezi from './BezgotovinskiPorezi';
import BezgotovinskiUkupno from './BezgotovinskiUkupno';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';
import BezgotovinskiHeader from './BezgotovinskiHeader';

import { RACUNI } from '../../../constants/routes';
import { useHistory } from 'react-router-dom';
import { BezgotovinskiSchema } from '../../../validation/bezgotovinski_racuni';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
import { racuniService } from '../../../services/RacuniService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { poreziService } from '../../../services/PoreziService';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Bezgotovinski = () => {
  const dispatch = useDispatch();
  // const racuni = useSelector(racuniSelector());
  const history = useHistory();
  let previousUrl = localStorage.getItem('previousUrl');

  const [porezi, setPorezi] = useState([]);
  useEffect(() => {
    dispatch(getStavke());
    (async () => setPorezi((await poreziService.getPorezi()).data))();
  }, [dispatch]);

  const handleSubmit = (values) => {
    let valuesStavke = values.stavke;
    values.stavke = values.niz;

    function getUkupnaCijenaSaPdv(stavka) {
      let UkupnaCijenaStavke = getUkupnaCijenaStavke(stavka);
      console.log('UkupnaCijenaStavke', UkupnaCijenaStavke);
      return UkupnaCijenaStavke;
      // return getUkupnaCijenaStavke(stavka);
    }

    function getUkupnaCijenaStavke(stavka) {
      stavka = {
        ...stavka,
        iznos_pdv_popust: Number(getIznosPdv(stavka)),
        // iznos_pdv_popust: Number(getIznosPdv(stavka).toFixed(2)),
      };

      if (stavka?.jedinicna_cijena_bez_pdv > 0) {
        let jedinicnaCijenaBezPdv = stavka?.jedinicna_cijena_bez_pdv;
        let jedinicnaCijenaSaPdv =
          stavka?.jedinicna_cijena_bez_pdv * (1 + +stavka?.porez?.stopa);

        if (!stavka.hasOwnProperty('tip_popusta') || !stavka?.tip_popusta) {
          jedinicnaCijenaSaPdv =
            jedinicnaCijenaBezPdv * (1 + +stavka?.porez?.stopa);
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - (stavka?.popust || 0);
        }

        if (stavka?.tip_popusta === 'iznos') {
          jedinicnaCijenaSaPdv =
            jedinicnaCijenaBezPdv * (1 + +stavka?.porez?.stopa);
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - stavka?.popust;
        }

        if (stavka?.tip_popusta === 'procenat') {
          jedinicnaCijenaSaPdv =
            jedinicnaCijenaBezPdv * (1 + +stavka?.porez?.stopa);
          jedinicnaCijenaSaPdv =
            jedinicnaCijenaSaPdv -
            jedinicnaCijenaSaPdv * (stavka?.popust / 100);
        }

        stavka = { ...stavka, jedinicna_cijena_sa_pdv: +jedinicnaCijenaSaPdv };
        stavka.cijena_sa_pdv_popust = +jedinicnaCijenaSaPdv;
        return +jedinicnaCijenaSaPdv;
      }

      let CijenaStavkeBezPdv = getCijenaStavkeBezPdv(stavka);
      let IznosPdv = getIznosPdv(stavka);
      return Number(getCijenaStavkeBezPdv(stavka)) + getIznosPdv(stavka);
      //stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena || stavka?.ukupna_cijena || 0;
    }

    function getIznosPdv(stavka) {
      return (
        getPorezStopaForId(stavka?.porez_id, stavka) *
        getCijenaStavkeBezPdv(stavka)
      );
    }

    function getPorezForId(porezId) {
      return porezi?.find((porez) => porez.id === porezId) || {};
    }

    function getPorezStopaForId(porezId, stavka) {
      return (
        stavka &&
        (getPorezForId(porezId)?.stopa ||
          getPorezForId(stavka?.roba?.cijene_roba[0]?.porez_id)?.stopa ||
          0)
      );
    }

    function izracunajCijenuSaPopustom(stavka, cijena) {
      if (!stavka?.tip_popusta) return cijena;
      if (stavka.tip_popusta === 'iznos')
        return cijena - Number(stavka.popust || 0);
      if (stavka.tip_popusta === 'procenat')
        return cijena - (Number(stavka.popust || 0) * cijena) / 100;
    }

    function getPopustStavke(stavka) {
      if (
        Number(stavka?.grupa?.popust_procenti) > 0 ||
        Number(stavka?.atribut_robe?.popust_procenti) > 0
      ) {
        return {
          iznos:
            Number(stavka?.grupa?.popust_procenti) ||
            Number(stavka?.atribut_robe?.popust_procenti) ||
            0,
          tip_popusta: 'procenat',
        };
      } else {
        return {
          iznos:
            Number(stavka?.grupa?.popust_iznos) ||
            Number(stavka?.atribut_robe?.popust_iznos) ||
            Number(stavka?.popust) ||
            0,
          tip_popusta: 'iznos',
        };
      }
    }

    function izracunajPocetnuCijenuSaPopustom(stavka, cijena) {
      stavka = { ...stavka, kolicina: 1 };

      let popustStart = getPopustStavke(stavka);

      if (!popustStart?.tip_popusta) return cijena;
      if (popustStart.tip_popusta === 'iznos') {
        stavka = { ...stavka, popust_iznos: popustStart.iznos };
        // stavka.tip_popusta=popustStart.tip_popusta;
        // stavka.popust=popustStart.iznos;
        values.niz[values.stavke.length - 1] = stavka;
        return Number(cijena) - Number(popustStart.iznos);
      }

      if (popustStart.tip_popusta === 'procenat') {
        stavka.tip_popusta = popustStart.tip_popusta;
        stavka.popust = popustStart.iznos;
        values.niz[values.stavke.length - 1] = stavka;
        return cijena - (Number(popustStart.iznos || 0) * cijena) / 100;
      }
    }

    function getCijenaStavkeBezPdv(stavka, index) {
      let cijena_sa_popustom;
      let indStavke = values.stavke.length;
      const pocetnaStavka = stavka;

      if (stavka?.tip_popusta) {
        cijena_sa_popustom = izracunajCijenuSaPopustom(
          stavka,
          stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
            stavka?.ukupna_cijena ||
            0
        );
      } else {
        cijena_sa_popustom = izracunajPocetnuCijenuSaPopustom(
          stavka,
          stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
            stavka?.ukupna_cijena ||
            0
        );
      }
      stavka = {
        ...stavka,
        cijena_sa_pdv_popust: Number(cijena_sa_popustom),
        // cijena_sa_pdv_popust: Number(cijena_sa_popustom).toFixed(4),
      };

      if (Number(values?.stavke[indStavke]?.cijena_bez_pdv_popust) === 0) {
      }

      if (stavka?.porez?.stopa > 0) {
        stavka = {
          ...stavka,
          cijena_bez_pdv_popust:
            Number(cijena_sa_popustom) /
            Number(1 + Number(stavka?.porez?.stopa)),
          cijena_bez_pdv: Number(pocetnaStavka.cijena_bez_pdv),
          // cijena_bez_pdv_popust: (
          //   Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
          // ).toFixed(4),
        };

        if (!stavka?.kolicina) {
          stavka = { ...stavka, kolicina: 1 };
        }

        //  stavka={...stavka,tip_popusta:getPopustStavke(stavka).tip_popusta,popust:getPopustStavke(stavka).iznos}

        //  values.niz[values.stavke.length-1].popust=values.stavke[values.stavke.length-1].popust;
        //  values.niz[values.stavke.length-1].tip_popusta=values.stavke[values.stavke.length-1].tip_popusta;
        values.niz[values.stavke.length - 1] = stavka;

        let tempVal =
          Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa));

        return (
          Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
        );
      } else {
        stavka = {
          ...stavka,
          cijena_bez_pdv_popust: Number(cijena_sa_popustom),
        };
        values.niz[values.stavke.length - 1] = stavka;
        return Number(cijena_sa_popustom);
      }
    }

    function getUkupnaCijenaBezPdv(stavka) {
      if (stavka?.jedinicna_cijena_bez_pdv) {
        let jedinicnaCijenaBezPdv = stavka?.jedinicna_cijena_bez_pdv;
        let jedinicnaCijenaSaPdv =
          jedinicnaCijenaBezPdv * (1 + +stavka?.porez?.stopa);

        if (!stavka.hasOwnProperty('tip_popusta') || !stavka?.tip_popusta) {
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - (stavka?.popust || 0);
          jedinicnaCijenaBezPdv =
            jedinicnaCijenaSaPdv / (1 + +stavka?.porez?.stopa);
        }

        if (stavka?.tip_popusta === 'iznos') {
          // jedinicnaCijenaBezPdv = jedinicnaCijenaBezPdv - stavka?.popust;
          // jedinicnaCijenaSaPdv =
          //   jedinicnaCijenaBezPdv * (1 + stavka?.porez?.stopa);
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - stavka?.popust;
          jedinicnaCijenaBezPdv =
            jedinicnaCijenaSaPdv / (1 + +stavka?.porez?.stopa);
        }

        if (stavka?.tip_popusta === 'procenat') {
          jedinicnaCijenaBezPdv =
            jedinicnaCijenaBezPdv -
            jedinicnaCijenaBezPdv * (stavka?.popust / 100);
        }

        stavka = {
          ...stavka,
          jedinicna_cijena_bez_pdv: +jedinicnaCijenaBezPdv,
        };
        stavka.cijena_bez_pdv_popust = +jedinicnaCijenaBezPdv;
        return +jedinicnaCijenaBezPdv;
      }

      return getCijenaStavkeBezPdv(stavka);
    }

    function getUkupanIznosPdv(stavka) {
      if (stavka?.jedinicna_cijena_bez_pdv > 0) {
        let jedinicnaCijenaSaPdv = Number(
          stavka?.jedinicna_cijena_bez_pdv * (1 + +stavka?.porez?.stopa)
        );

        let jedinicnaCijenaBezPdvPopust = stavka?.jedinicna_cijena_bez_pdv;

        if (!stavka.hasOwnProperty('tip_popusta') || !stavka?.tip_popusta) {
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - (stavka?.popust || 0);
          jedinicnaCijenaBezPdvPopust =
            jedinicnaCijenaSaPdv / (1 + +stavka?.porez?.stopa);
        }

        if (stavka?.tip_popusta === 'iznos') {
          jedinicnaCijenaSaPdv = jedinicnaCijenaSaPdv - stavka?.popust;
          jedinicnaCijenaBezPdvPopust =
            jedinicnaCijenaBezPdvPopust - stavka?.popust;
        }

        if (stavka?.tip_popusta === 'procenat') {
          jedinicnaCijenaSaPdv =
            jedinicnaCijenaSaPdv -
            jedinicnaCijenaSaPdv * (stavka?.popust / 100);

          jedinicnaCijenaBezPdvPopust =
            jedinicnaCijenaBezPdvPopust -
            jedinicnaCijenaBezPdvPopust * (stavka?.popust / 100);
        }

        stavka = {
          ...stavka,
          iznos_jedinicni_pdv_popust:
            +jedinicnaCijenaSaPdv - +jedinicnaCijenaBezPdvPopust,
        };
        stavka.iznos_pdv_popust =
          jedinicnaCijenaSaPdv - +jedinicnaCijenaBezPdvPopust;
        return (
          (jedinicnaCijenaSaPdv - +jedinicnaCijenaBezPdvPopust) *
          (stavka && stavka.kolicina ? stavka.kolicina : 1)
        );
      }

      return getUkupnaCijenaSaPdv(stavka) - getUkupnaCijenaBezPdv(stavka);
    }

    for (let i = 0; i < valuesStavke.length; i++) {
      values.stavke[i].opis = valuesStavke[i].opis;
      values.stavke[i].kolicina = valuesStavke[i].kolicina;
      values.stavke[i].popust = valuesStavke[i].popust;
      values.stavke[i].tip_popusta = valuesStavke[i].tip_popusta;

      values.stavke[i].cijena_sa_pdv_popust = getUkupnaCijenaSaPdv(
        valuesStavke[i]
      );
      values.stavke[i].cijena_bez_pdv_popust = getUkupnaCijenaBezPdv(
        valuesStavke[i]
      );
      values.stavke[i].iznos_pdv_popust = getUkupanIznosPdv(valuesStavke[i]);

      if (
        valuesStavke[i].hasOwnProperty('jedinicna_cijena_bez_pdv') &&
        valuesStavke[i]?.jedinicna_cijena_bez_pdv > 0
      ) {
        // Iskoristiti funkcije getUkupnaCijenaSaPdv, getUkupnaCijenaBezPdv i getUkupanIznosPdv
        values.stavke[i].cijena_bez_pdv_popust = getUkupnaCijenaBezPdv(
          valuesStavke[i]
        );
        values.stavke[i].iznos_pdv_popust = getUkupanIznosPdv(valuesStavke[i]);
        values.stavke[i].cijena_sa_pdv_popust =
          values.stavke[i].iznos_pdv_popust +
          values.stavke[i].cijena_bez_pdv_popust;
      }
    }
    console.log('values', values);

    if (values.stavke.length === 0) {
      toast.error('Račun mora imati makar jednu stavku!', toastSettings);
      return;
    }
    if (!values.stavke[0]) {
      toast.error(
        'Račun mora imati makar jednu stavku i mora biti odabrana roba/usluga za datu stavku!',
        toastSettings
      );
      return;
    }

    if (values.partner_id == null || values.partner_id === 0) {
      toast.error('Kupac je neophodan', toastSettings);
      return;
    }

    let returnForEach = false;
    values &&
      values.stavke.forEach((racun, index) => {
        console.log('index', index + 1);
        let indexTemp = index + 1;
        if (racun.kolicina == null || racun.kolicina <= 0) {
          toast.error(
            'Količina stavke mora biti veća od 0 na stavci ' + +indexTemp,
            toastSettings
          );
          racun.kolicina = 1;
          returnForEach = true;
          return;
        }
        if (racun.jedinica_mjere_id == null) {
          toast.error(
            'Jedinica mjere stavke je neophodna na stavci ' + +indexTemp,
            toastSettings
          );
          returnForEach = true;
          return;
        }
        if (racun.ukupna_cijena == null || racun.ukupna_cijena <= 0) {
          toast.error(
            'Cijena stavke mora biti veća od 0 na stavci ' + +indexTemp,
            toastSettings
          );
          returnForEach = true;
          return;
        }
        if (!racun.tip_popusta) {
          racun.tip_popusta = 'iznos';
        }
        if (!racun.popust) {
          racun.popust = 0;
        }
      });

    if (returnForEach) return;

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

    if (values.partner_id) {
      dispatch(storeBezgotovinskiRacun(noviRacun));
      dispatch(getRacuni());
      history.push(RACUNI.INDEX);
    }
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

  const initialValues = {
    stavke: [],
    korektivni_racun: '0',
    datum_izdavanja: today,
    datum_za_placanje: seven_days,
    pdv_obveznik: 1,
    status: 'nijeplacen',
    nacin_placanja: 'ACCOUNT',
    niz: [],
    popustObjekat: {},
    // a:[],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //innerRef={formikRef}
      enableReinitialize
      // validationSchema={BezgotovinskiSchema}
      validateOnChange={false}
      validateOnBlur={true}
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
                  <div className="col-xl-4 col-md-4 col-12">
                    <h4 className="heading-quaternary">Naziv usluge / robe</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">jedinična cijena</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">JM / Količina</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">PDV stopa</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
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
                    disabled={!values.partner_id}
                    type="submit"
                    className="btn btn__primary"
                  >
                    Sačuvaj i Fiskalizuj
                  </button>
                  {/* <button
                    onClick={() => {
                      dispatch(setRacun({}));
                      handleSubmit(values);
                    }}
                    className="btn btn__secondary ml-m"
                  >
                    Sačuvaj kao privremeni
                  </button> */}
                  <button
                    onClick={() => {
                      history.push(RACUNI.INDEX);
                    }}
                    className="btn btn__link ml-m"
                  >
                    <Link to={RACUNI.INDEX}>Obustavi</Link>
                  </button>
                  {!values.partner_id && (
                    <p className="error" style={{ marginLeft: '100px' }}>
                      Kupac nije dodat!
                    </p>
                  )}
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
