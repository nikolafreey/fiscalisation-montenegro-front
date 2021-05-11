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
    return roba?.atribut_robe?.popust_iznos || usluga?.grupa?.popust_iznos;
  }
  function getUkupanPopustProcenat() {
    const popustProcenat =
      roba?.atribut_robe?.popust_procenti || usluga?.grupa?.popust_procenti;
    return ((Number(popustProcenat) * Number(getUkupnaCijena())) / 100).toFixed(
      2
    );
  }
  function getUkupanPopustIznos() {
    //return stavka.grupa.popust_iznos * stavka.kolicina;
    return getPopustIznos() * stavka.kolicina;
  }

  function getUkupnaCijena() {
    return roba
      ? Number(roba?.roba?.cijene_roba?.[0]?.ukupna_cijena) *
          Number(stavka.kolicina)
      : Number(usluga?.ukupna_cijena) * Number(stavka.kolicina);
  }
  console.log('usluge', usluga);
  return (
    <div className="side-info__wrapper">
      <div className="side-info__info as-end mb-10">
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="txt-dark">{roba ? roba.roba.naziv : usluga.naziv}</p>
            {stavka.opis && <p className="txt-light">{stavka.opis}</p>}
          </div>
          <div className="col-r w-break-unset">
            <div className="spn-mr-10 df">
              {/* {roba
                ? Number(
                    stavka.kolicina * roba.roba.cijene_roba[0].ukupna_cijena
                  )
                    .toFixed(2)
                    .replace('.', ',') + '€'
                : Number(stavka.kolicina * usluga.ukupna_cijena)
                    .toFixed(2)
                    .replace('.', ',') + '€'} */}
              {Number(getPopustProcenat()) > 0
                ? (getUkupnaCijena() - Number(getUkupanPopustProcenat()))
                    .toFixed(2)
                    .replace('.', ',') + '€'
                : (Number(getUkupnaCijena()) - Number(getUkupanPopustIznos()))
                    .toFixed(2)
                    .replace('.', ',') + '€'}

              <span className="btn btn__link danger df ai-start" onClick={handleRemove}>
                <DeleteIcon />
              </span>
            </div>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="ml-15 txt-dark">
              Kol <span>x</span> Cijena
            </p>
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
                {(Number(getPopustProcenat()) > 0 ||
                  Number(getPopustIznos()) > 0) && (
                  <p className="ml-15 txt-dark">
                    Popust{' '}
                    {Number(getPopustProcenat()) > 0
                      ? getPopustProcenat() + '%'
                      : 'u iznosu'}
                  </p>
                )}
              </div>
              {(Number(getUkupanPopustIznos()) > 0 ||
                Number(getUkupanPopustProcenat()) > 0) && (
                <div className="col-r w-break-unset">
                  {Number(getUkupanPopustProcenat()) > 0 ? (
                    <span className="mr-m">
                      -
                      {Number(getUkupanPopustProcenat())
                        .toFixed(2)
                        .replace('.', ',') + '€'}
                    </span>
                  ) : (
                    <span className="mr-m">
                      -
                      {Number(getUkupanPopustIznos())
                        .toFixed(2)
                        .replace('.', ',') + '€'}
                    </span>
                  )}
                </div>
              )}
            </div>
            {(Number(getPopustProcenat()) > 0 ||
              Number(getPopustIznos()) > 0) && (
              <div className="side-info__info--inner-wrapper mb-0">
                <div className="col-l w-break">
                  <p className="ml-15 txt-dark">Cijena sa popustom</p>
                </div>
                <div className="col-r w-break-unset">
                  <span className="mr-m">
                    {Number(getPopustProcenat()) > 0
                      ? (
                          Number(getUkupnaCijena()) -
                          Number(getUkupanPopustProcenat())
                        )
                          .toFixed(2)
                          .replace('.', ',') + '€'
                      : (
                          Number(getUkupnaCijena()) -
                          Number(getUkupanPopustIznos())
                        )
                          .toFixed(2)
                          .replace('.', ',') + '€'}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NoviRacunPreviewStavka;
