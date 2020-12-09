import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKategorijeRobe } from '../../../store/actions/KategorijeRobeActions';
import { kategorijeRobeSelector } from '../../../store/selectors/KategorijeRobeSelector';
import { omit } from 'lodash';

const ChooseKategorija = () => {
  const dispatch = useDispatch();

  const kategorije = useSelector(kategorijeRobeSelector());

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

  return kategorije.map((kategorija, index) => (
    <div key={kategorija.id}>
      <input
        type="checkbox"
        name="kategorije"
        value={kategorija.id}
        checked={values.kategorije[kategorija.id]}
        onChange={(event) =>
          handleChangeKategorija(event.target.checked, kategorija)
        }
      />
      <label>{kategorija.naziv}</label>
      {kategorija.podkategorije_robe.map(
        (podkategorija, index_podkategorija) => (
          <div key={podkategorija.id}>
            <input
              style={{ marginLeft: '2rem' }}
              type="checkbox"
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
            <label>{podkategorija.naziv}</label>
          </div>
        )
      )}
    </div>
  ));
};

export default ChooseKategorija;
