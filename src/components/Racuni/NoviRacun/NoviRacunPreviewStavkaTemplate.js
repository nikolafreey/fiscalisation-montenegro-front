import React from 'react';
import { useDispatch } from 'react-redux';
import { ukloniRobu, ukloniUslugu } from '../../../store/actions/RacuniActions';
import { ReactComponent as DeleteIcon } from '../../../assets/icon/x-delete.svg';

const NoviRacunPreviewStavkaTemplate = (props) => {
  const dispatch = useDispatch();

  

  console.log('pr==',props)

  function getPopustProcenat() {
    return (
      (Number(stavka.cijena_sa_pdv)-Number(stavka.cijena_sa_pdv_popust))
    );
  }
  
  function getPopustIznos() {
    return (Number(stavka.cijena_sa_pdv)-Number(stavka.cijena_sa_pdv_popust));
  }
  function getUkupanPopustProcenat() {
    
    return getPopustProcenat()*Number(stavka.kolicina).toFixed(2);
  }
  function getUkupanPopustIznos() {
    //return stavka.grupa.popust_iznos * stavka.kolicina;
    return getPopustIznos() * stavka.kolicina;
  }

  function getUkupnaCijena() {
    return  Number(stavka.cijena_sa_pdv)*Number(stavka.kolicina);
  }
console.log('stavka u pozivu',stavka.jedinicna_cijena_bez_pdv)
  return (
    <div className="side-info__wrapper">
      <div className="side-info__info as-end mb-10">
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="txt-dark">{stavka.naziv}</p>
            <p className="txt-light">{stavka.opis}</p>
          </div>
          <div className="col-r w-break-unset">
            <div className="spn-mr-10 df">
            
                 {Number(getPopustProcenat()) > 0
                    ? (
                       getUkupnaCijena() -
                       Number(getUkupanPopustProcenat())
                      ).toFixed(2).replace('.', ',') + '€'
                    : (Number(getUkupnaCijena()) -
                      Number(getUkupanPopustIznos())).toFixed(2).replace('.', ',') + '€'}
            </div>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper mb-0">
          <div className="col-l w-break">
            <p className="ml-15 txt-dark">Kol <span>x</span> Cijena</p>
          </div>
          <div className="col-r w-break-unset mr-m">
            {stavka.kolicina} x{' '}
            { Number(stavka.ukupna_cijena_sa_pdv)
                  .toFixed(2)
                  .replace('.', ',') 
              }
          </div>
        </div>
        {getPopustIznos() && (
          <>
            <div className="side-info__info--inner-wrapper mb-0">
              <div className="col-l w-break">
                <p className="ml-15 txt-dark">
                  Popust{' '}
                  {Number(stavka.popust_procenti) > 0
                    ? getPopustProcenat() + '%'
                    : 'u iznosu'}
                </p>
              </div>
              <div className="col-r w-break-unset">
                {Number(getUkupanPopustProcenat()) > 0 ? (
                  <span className="mr-m">
                    -
                    {Number(getUkupanPopustProcenat())
                      .toFixed(2)
                      .replace('.', ',') }
                  </span>
                ) : (
                  <span className="mr-m">
                    -
                    {Number(getUkupanPopustIznos()).toFixed(2).replace('.', ',') 
                      }
                  </span>
                )}
              </div>
            </div>
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
                      ).toFixed(2).replace('.', ',') +
                      '€'
                    : (Number(getUkupnaCijena()) -
                      Number(getUkupanPopustIznos())).toFixed(2).replace('.', ',') +
                      '€'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoviRacunPreviewStavkaTemplate;
