import { useFormikContext } from 'formik';
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

  const tipoviAtributa = useSelector(tipoviAtributaSelector());
  const tipAtributa = useSelector(tipAtributaSelector());

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
  const checkedAtributi = () => {
    const a = tipAtributa.atributi?.filter((atribut) =>
      values.atributi?.includes(atribut.id)
    );
    return a;
  };
  const [fieldVisible, setFieldVisible] = useState(false);
  const [fieldTipVisible, setFieldTipVisible] = useState(false);
  const [naziv, setNaziv] = useState('');

  const handleSubmitTipAtributa = () => {
    dispatch(storeTipAtributa({ naziv }));
    setFieldVisible(false);
  };
  const handleSubmitAtribut = () => {
    dispatch(storeAtribut({ naziv, tip_atributa_id: tipAtributa.id }));
    setFieldVisible(false);
  };
  const handleChangeTipAtributa = (event) => {
    setNaziv(event.target.value);
  };

  const handleChangeNoviAtribut = (event) => {
    setNaziv(event.target.value);
  };
  return (
    <>
      <div class="col-md-4">
        <h2 class="heading-secondary">
          Atributi <span class="span-light"> - Opciono</span>
        </h2>
        <p>
          Consequat eget volutpat enim libero nulla neque ultrices. Sed
          tristique nullam erat in interdum.
        </p>
        <div class="mt-30">
          <p class="txt-light">Izabrani atributi:</p>
          <p class="txt-dark">{tipAtributa.naziv}:</p>
          <p class="txt-light mb-15">
            {checkedAtributi()
              ?.map((atribut) => atribut.naziv)
              ?.join(' , ')}
          </p>
        </div>
      </div>
      <div class="col-md-8">
        <div class="search-big-box df">
          <div class="first-half">
            <div class="search-wrapper">
              <input
                type="text"
                class="search__input"
                placeholder="Pronađite tip atribut"
              />
            </div>

            <ul class="item-list">
              {tipoviAtributa.map((tipAtributa) => (
                <li
                  onClick={() => dispatch(setTipAtributa(tipAtributa))}
                  class="item-f"
                >
                  <span>
                    {tipAtributa.naziv}
                    <RightSvg />
                  </span>
                </li>
              ))}
            </ul>
            {fieldTipVisible ? (
              <div class="search-wrapper">
                <input
                  name="naziv"
                  type="text"
                  class="search__input"
                  placeholder="Novi tip"
                  onChange={handleChangeTipAtributa}
                />
                <button
                  class="btn btn__dark jc-center"
                  onClick={handleSubmitTipAtributa}
                >
                  Dodaj tip atributa
                </button>
              </div>
            ) : (
              <p class="link" onClick={() => setFieldTipVisible(true)}>
                + Kreiraj tip atributa
              </p>
            )}
          </div>
          <div class="second-half">
            <div class="search-wrapper">
              <input
                type="text"
                class="search__input"
                placeholder="Pronađite atribut"
              />
            </div>
            <ul class="item-list">
              {tipAtributa.atributi?.map((atribut) => (
                <div key={atribut.id}>
                  <li class="item-check">
                    <input
                      class="form__checkbox"
                      type="checkbox"
                      name="atributi"
                      value={atribut.id}
                      checked={values.atributi?.includes(atribut.id)}
                      onChange={(event) =>
                        handleChangeAtribut(event.target.checked, atribut)
                      }
                    />
                    <label class="form__checkbox-label">{atribut.naziv}</label>
                  </li>
                </div>
              ))}
            </ul>

            {fieldVisible ? (
              <div class="search-wrapper">
                <input
                  type="text"
                  class="search__input"
                  onChange={handleChangeNoviAtribut}
                  placeholder="Novi atribut"
                />
                <button
                  class="btn btn__dark jc-center"
                  onClick={handleSubmitAtribut}
                >
                  Dodaj atribut
                </button>
              </div>
            ) : (
              <p class="link" onClick={() => setFieldVisible(true)}>
                + Kreiraj atribut
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseAtribut;
