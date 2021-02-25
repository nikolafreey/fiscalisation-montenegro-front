import React from 'react';
import { useDispatch } from 'react-redux';
import { ukloniRobu, ukloniUslugu } from '../../../store/actions/RacuniActions';
import { ReactComponent as DeleteIcon } from '../../../assets/icon/x-delete.svg';

const NoviRacunPreviewStavka = ({ roba, usluga }) => {
  const dispatch = useDispatch();

  const stavka = roba || usluga;

  const handleRemove = () => {
    if (roba) {
      dispatch(ukloniRobu(roba));
    }
    if (usluga) {
      dispatch(ukloniUslugu(usluga));
    }
  };

  function getPopustProcenat() {
    return (
      roba?.atribut_robe?.popust_procenti || usluga?.grupa?.popust_procenti
    );
  }

  function getPopustIznos() {
    const ukupna_cijenaUsluga = Number(usluga?.cijena_bez_pdv);

    const ukupna_cijenaRoba = Number(
      roba?.roba?.cijene_roba[0]?.cijena_bez_pdv
    );

    const popustRoba = roba?.atribut_robe?.popust_procenti / 100;
    const popustUsluga = usluga?.grupa?.popust_procenti / 100;

    return (
      ukupna_cijenaUsluga * popustUsluga * stavka.kolicina ||
      ukupna_cijenaRoba * popustRoba * stavka.kolicina
    );
  }

  function getUkupnaCijena() {
    return roba
      ? Number(roba?.roba?.cijene_roba?.[0]?.ukupna_cijena).toFixed(2)
      : Number(usluga?.ukupna_cijena).toFixed(2);
  }

  return (
    <div className="side-info__wrapper">
      <div className="side-info__info as-end mb-10">
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="txt-dark">{roba ? roba.roba.naziv : usluga.naziv}</p>
            <p className="txt-light">{stavka.opis}</p>
          </div>
          <div className="col-r w-break-unset">
            <div className="spn-mr-10 df">
              {roba
                ? Number(
                    stavka.kolicina * roba.roba.cijene_roba[0].ukupna_cijena
                  )
                    .toFixed(2)
                    .replace('.', ',') + '€'
                : Number(stavka.kolicina * usluga.ukupna_cijena)
                    .toFixed(2)
                    .replace('.', ',') + '€'}
              <span className="btn btn__link danger df" onClick={handleRemove}>
                <DeleteIcon />
              </span>
            </div>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="ml-15 txt-dark">Količina</p>
          </div>
          <div className="col-r w-break-unset mr-m">
            {stavka.kolicina} x{' '}
            {roba
              ? Number(roba.roba.cijene_roba[0].ukupna_cijena)
                  .toFixed(2)
                  .replace('.', ',') + '€'
              : Number(usluga.ukupna_cijena).toFixed(2).replace('.', ',') + '€'}
          </div>
        </div>
        {getPopustIznos() && (
          <>
            <div className="side-info__info--inner-wrapper mb-0">
              <div className="col-l w-break">
                <p className="ml-15 txt-dark">Popust {getPopustProcenat()}%</p>
              </div>
              <div className="col-r w-break-unset">
                <span className="mr-m">
                  -{Number(getPopustIznos()).toFixed(2).replace('.', ',') + '€'}
                </span>
              </div>
            </div>
            <div className="side-info__info--inner-wrapper mb-0">
              <div className="col-l w-break">
                <p className="ml-15 txt-dark">Cijena sa popustom</p>
              </div>
              <div className="col-r w-break-unset">
                <span className="mr-m">
                  {(
                    Number(getUkupnaCijena()) - Number(getPopustIznos())
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoviRacunPreviewStavka;
