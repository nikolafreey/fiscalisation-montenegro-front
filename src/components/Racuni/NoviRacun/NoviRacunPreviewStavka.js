import React from 'react';
import { useDispatch } from 'react-redux';
import { ukloniRobu, ukloniUslugu } from '../../../store/actions/RacuniActions';

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

  return (
    <div class="row mb-15">
      <div class="col-lg-8">
        <p>{roba ? roba.roba.naziv : usluga.naziv}</p>
        <p class="txt-light">{stavka.opis}</p>
      </div>
      <div class="col-lg-4">
        <div class="df jc-end">
          <span class="spn-mr-10">
            {roba
              ? Number(stavka.kolicina * roba.roba.cijene_roba[0].ukupna_cijena).toFixed(2)
              : Number(stavka.kolicina * usluga.ukupna_cijena).toFixed(2)}
          </span>
          <span class="btn btn__link danger" onClick={handleRemove}>
            x
          </span>
        </div>
      </div>
      <div class="df jc-end">
        {stavka.kolicina} x{' '}
        {roba ? Number(roba.roba.cijene_roba[0].ukupna_cijena).toFixed(2) : Number(usluga.ukupna_cijena).toFixed(2)}
      </div>
      {stavka.popust_procenat && (
        <>
          <div class="col-lg-8">
            <p>Popust {stavka.popust_procenat}%</p>
          </div>
          <div class="col-lg-4">
            <span>-{stavka.popust_iznos}</span>
          </div>
          <div class="col-lg-8">
            <p>Cijena sa popustom</p>
          </div>
          <div class="col-lg-4">
            <div class="df jc-end w-62">
              <span>{stavka.ukupna_cijena.toFixed(2) - stavka.popust_iznos.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoviRacunPreviewStavka;