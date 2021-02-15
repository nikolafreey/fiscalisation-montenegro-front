import React from 'react';
import { useDispatch } from 'react-redux';
import { ukloniRobu, ukloniUslugu } from '../../../store/actions/RacuniActions';
import DeleteIcon from '../../../assets/icon/x-delete.svg'

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
    return roba?.atribut_robe?.popust_iznos || usluga?.grupa?.popust_iznos;
  }

  function getUkupnaCijena() {
    return roba
      ? Number(roba?.roba?.cijene_roba?.[0]?.ukupna_cijena).toFixed(2)
      : Number(usluga?.ukupna_cijena).toFixed(2);
  }

  return (
    <div className="row mb-15">
      <div className="col-lg-8">
        <p>{roba ? roba.roba.naziv : usluga.naziv}</p>
        <p className="txt-light">{stavka.opis}</p>
      </div>
      <div className="col-lg-4">
        <div className="df jc-end">
          <span className="spn-mr-10">
            {roba
              ? Number(stavka.kolicina * roba.roba.cijene_roba[0].ukupna_cijena)
                  .toFixed(2)
                  .replace('.', ',') + '€'
              : Number(stavka.kolicina * usluga.ukupna_cijena)
                  .toFixed(2)
                  .replace('.', ',') + '€'}
          </span>
          <span className="btn btn__link danger" onClick={handleRemove}>
            {/* <DeleteIcon /> */}
            x
          </span>
        </div>
        <div className="df jc-end">
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
          <div className="col-lg-8">
            <p>Popust {getPopustProcenat()}%</p>
          </div>
          <div className="col-lg-4">
            <span>
              -{Number(getPopustIznos()).toFixed(2).replace('.', ',') + '€'}
            </span>
          </div>
          <div className="col-lg-8">
            <p>Cijena sa popustom</p>
          </div>
          <div className="col-lg-4">
            <div className="df jc-end w-62">
              <span>
                {(Number(getUkupnaCijena()) - Number(getPopustIznos())).toFixed(
                  2
                )}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoviRacunPreviewStavka;
