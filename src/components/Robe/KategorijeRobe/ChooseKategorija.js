import { useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKategorijeRobe } from '../../../store/actions/KategorijeRobeActions';
import { kategorijeRobeSelector } from '../../../store/selectors/KategorijeRobeSelector';
import { omit } from 'lodash';

const ChooseKategorija = (props) => {
  const dispatch = useDispatch();
  const checkboxKategorije = useRef();

  const kategorije = props.kategorije; //useSelector(kategorijeRobeSelector());

  console.log('editKategorije', props.editKategorije);
  console.log('Kategorije', kategorije);

  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    dispatch(getKategorijeRobe());
  }, [dispatch]);

  const handleChangeKategorija = (checked, kategorija) => {
    if (checked)
      setFieldValue(`kategorije`, {
        ...values.kategorije,
        [kategorija.id]: [],
      });
    else setFieldValue(`kategorije`, omit(values.kategorije, kategorija.id));
  };

  const handleChangePodkategorija = (checked, kategorija, podkategorija) => {
    if (checked)
      setFieldValue(
        `kategorije.${kategorija.id}`,
        values.kategorije[kategorija.id]
          ? [...values.kategorije[kategorija.id], podkategorija.id]
          : [podkategorija.id]
      );
    else
      setFieldValue(
        `kategorije.${kategorija.id}`,
        values.kategorije[kategorija.id].filter((id) => id !== podkategorija.id)
      );
  };

  console.log('checkboxKategorije', checkboxKategorije);

  return kategorije.map((kategorija, index) => (
    <>
      <li className="item-check" ref={checkboxKategorije} key={kategorija.id}>
        <div className="form__checkbox-group">
          <input
            className="form__checkbox"
            type="checkbox"
            name="kategorije"
            value={kategorija.id}
            id={kategorija.naziv}
            checked={
              (Object.keys(props?.editKategorije).length !== 0 &&
                values.kategorije[
                  props?.editKategorije?.robe_kategorije_podkategorije[0]
                    ?.kategorija_robe_id
                ]) ||
              values?.kategorije[kategorija.id]
            }
            onChange={(event) =>
              handleChangeKategorija(event.target.checked, kategorija)
            }
          />
          <label className="form__checkbox-label" htmlFor={kategorija.naziv}>{kategorija.naziv}</label>
        </div>
      </li>
      {kategorija.podkategorije_robe.map(
        (podkategorija, index_podkategorija) => (
          <>
            <li className="sub-item-check" key={podkategorija.id}>
              <div className="form__checkbox-group">
                <input
                  style={{ marginLeft: '2rem' }}
                  type="checkbox"
                  className="form__checkbox"
                  id={podkategorija.naziv}
                  name="podkategorije"
                  value={podkategorija.id}
                  checked={values.kategorije[kategorija.id]?.includes(
                    podkategorija.id
                  )}
                  onChange={(event) =>
                    handleChangePodkategorija(
                      event.target.checked,
                      kategorija,
                      podkategorija
                    )
                  }
                />
                <label className="form__checkbox-label" htmlFor={podkategorija.naziv}>{podkategorija.naziv}</label>
              </div>
            </li>
          </>
        )
      )}
    </>
  ));
};

export default ChooseKategorija;
