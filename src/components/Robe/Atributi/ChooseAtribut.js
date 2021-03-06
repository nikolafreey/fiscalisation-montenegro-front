import { useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ReactComponent as RightSvg } from '../../../assets/icon/right.svg';

import { useDispatch, useSelector } from 'react-redux';
import {
  getTipoviAtributa,
  setTipAtributa,
  storeAtribut,
  storeTipAtributa,
} from '../../../store/actions/AtributiActions';
import {
  tipAtributaSelector,
  tipoviAtributaSelector,
} from '../../../store/selectors/AtributiSelector';

const ChooseAtribut = () => {
  const dispatch = useDispatch();

  const tipAtributa = useSelector(tipAtributaSelector());
  const tipoviAtributa = useSelector(tipoviAtributaSelector());

  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    dispatch(getTipoviAtributa());
  }, [dispatch]);

  const handleChangeAtribut = (checked, atribut) => {
    if (checked) setFieldValue(`atributi`, [...values.atributi, atribut.id]);
    else
      setFieldValue(
        `atributi`,
        values.atributi.filter((atributId) => atributId !== atribut.id)
      );
  };
  const checkedAtributi = (tipAtributa) => {
    const a = tipAtributa.atributi?.filter((atribut) =>
      values.atributi?.includes(atribut.id)
    );
    return a;
  };
  const [fieldVisible, setFieldVisible] = useState(false);
  const [fieldTipVisible, setFieldTipVisible] = useState(false);
  const [naziv, setNaziv] = useState('');

  const handleSubmitTipAtributa = (event) => {
    if (event.key === 'Enter') {
      dispatch(storeTipAtributa({ naziv }));
      setFieldTipVisible(false);
      setNaziv(null);
    }
  };
  const handleSubmitAtribut = (event) => {
    if (event.key === 'Enter') {
      dispatch(storeAtribut({ naziv, tip_atributa_id: tipAtributa.id }));
      setFieldVisible(false);
      setNaziv(null);
    }
  };
  const handleChangeTipAtributa = (event) => {
    setNaziv(event.target.value);
  };

  const handleChangeNoviAtribut = (event) => {
    setNaziv(event.target.value);
  };

  const [tipoviAtributaSearch, setTipoviAtributaSearch] = useState('');
  const [tipoviAtributaValue, setTipoviAtributaValue] = useState('');

  const handleTipAtributaSearch = (event) => {
    const filteredTipoviAtributa = tipoviAtributa.filter((tipAtributa) => {
      return tipAtributa.naziv
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setTipoviAtributaSearch(event.target.value);
    setTipoviAtributaValue(filteredTipoviAtributa);
  };

  const [atributSearch, setAtributSearch] = useState('');
  const [atributValue, setAtributValue] = useState('');

  const handleAtributSearch = (event) => {
    const filteredAtributi = tipAtributa.atributi.filter((atribut) => {
      return atribut.naziv
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setAtributSearch(event.target.value);
    setAtributValue(filteredAtributi);
    console.log('tipAtributa1', tipAtributa);
    console.log('filteredAtributi', filteredAtributi);
    console.log('atributValue', atributValue);
  };

  return (
    <>
      <div className="col-md-4">
        <h2 className="heading-secondary">
          Atributi <span className="span-light"></span>
        </h2>
        <p className="txt-light">
          {/* Consequat eget volutpat enim libero nulla neque ultrices. Sed
          tristique nullam erat in interdum. */}
        </p>
        <div className="mt-30">
          <p className="txt-light">Izabrani atributi:</p>
          {tipoviAtributa.map((tipAtributa) => {
            const odabraniAtributi = checkedAtributi(tipAtributa);
            return odabraniAtributi.length ? (
              <>
                <p className="txt-dark">{tipAtributa.naziv}:</p>
                <p className="txt-light mb-15">
                  {odabraniAtributi
                    ?.map((atribut) => atribut.naziv)
                    ?.join(', ')}
                </p>
              </>
            ) : null;
          })}
        </div>
      </div>
      <div className="col-md-8">
        <div className="search-big-box df">
          <div className="first-half">
            <div className="search-wrapper">
              <input
                type="text"
                className="search__input"
                onChange={handleTipAtributaSearch}
                value={tipoviAtributaSearch}
                placeholder="Prona??ite Tip Atributa"
              />
            </div>

            <ul className="item-list">
              {(tipoviAtributaValue || tipoviAtributa).map((tipAtributa) => (
                <li
                  onClick={() => {
                    dispatch(setTipAtributa(tipAtributa));
                    setAtributValue(tipAtributa);
                    console.log('tipAtributa', tipAtributa);
                  }}
                  className="item-f"
                >
                  <>
                    {tipAtributa.naziv}
                    <RightSvg />
                  </>
                </li>
              ))}
            </ul>
            {fieldTipVisible ? (
              <div className="search-wrapper">
                <input
                  name="naziv"
                  type="text"
                  className="search__input"
                  onKeyDown={handleSubmitTipAtributa}
                  placeholder="Unesite novi tip i pritisnite ENTER"
                  onChange={handleChangeTipAtributa}
                />
              </div>
            ) : (
              <Link
                className="link ml-10 mb-10"
                onClick={() => setFieldTipVisible(true)}
              >
                + Kreiraj tip atributa
              </Link>
            )}
          </div>
          <div className="second-half">
            <div className="search-wrapper">
              <input
                type="text"
                className="search__input"
                onChange={handleAtributSearch}
                value={atributSearch}
                placeholder="Prona??ite atribut"
              />
            </div>
            <ul className="item-list">
              {!atributSearch
                ? tipAtributa?.atributi?.map((atribut) => (
                    <div className="form__checkbox-group" key={atribut.id}>
                      <li className="item-check">
                        <input
                          className="form__checkbox"
                          type="checkbox"
                          id={atribut.naziv}
                          name="atributi"
                          value={atribut.id}
                          checked={values.atributi?.includes(atribut.id)}
                          onChange={(event) =>
                            handleChangeAtribut(event.target.checked, atribut)
                          }
                        />
                        <label
                          className="form__checkbox-label"
                          htmlFor={atribut.naziv}
                        >
                          {atribut.naziv}
                        </label>
                      </li>
                    </div>
                  ))
                : atributValue?.map((atribut) => (
                    <div className="form__checkbox-group" key={atribut.id}>
                      <li className="item-check">
                        <input
                          className="form__checkbox"
                          type="checkbox"
                          id={atribut.naziv}
                          name="atributi"
                          value={atribut.id}
                          checked={values.atributi?.includes(atribut.id)}
                          onChange={(event) =>
                            handleChangeAtribut(event.target.checked, atribut)
                          }
                        />
                        <label
                          className="form__checkbox-label"
                          htmlFor={atribut.naziv}
                        >
                          {atribut.naziv}
                        </label>
                      </li>
                    </div>
                  ))}
            </ul>

            {fieldVisible ? (
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search__input"
                  onChange={handleChangeNoviAtribut}
                  onKeyDown={handleSubmitAtribut}
                  placeholder="Unesite novi atribut i pritisnite ENTER"
                />
              </div>
            ) : (
              <Link
                className="link ml-10"
                onClick={() => setFieldVisible(true)}
              >
                + Kreiraj atribut
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseAtribut;
