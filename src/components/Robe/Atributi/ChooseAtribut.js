import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTipoviAtributa,
  setTipAtributa,
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
    if (checked)
      setFieldValue(`atributi`, [
        ...values.atributi,
        atribut.id,
      ]);
    else setFieldValue(`atributi`, values.atributi.filter(atributId => atributId !== atribut.id));
  };

  return (
    <div>
      <div>
        <h3>Tipovi atributa</h3>
        {tipoviAtributa.map((tipAtributa) => (
          <p onClick={() => dispatch(setTipAtributa(tipAtributa))}>
            {tipAtributa.naziv}
          </p>
        ))}
      </div>
      <div>
        <h3>Atributi</h3>
        {tipAtributa.atributi?.map((atribut) => (
          <div key={atribut.id}>
            <input
              type="checkbox"
              name="atributi"
              value={atribut.id}
              checked={values.atributi?.includes(atribut.id)}
              onChange={(event) =>
                handleChangeAtribut(event.target.checked, atribut)
              }
            />
            <label>{atribut.naziv}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseAtribut;
