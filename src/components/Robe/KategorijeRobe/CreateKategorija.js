import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeKategorijaRobe } from '../../../store/actions/KategorijeRobeActions';

const CreateKategorija = () => {
  const dispatch = useDispatch();

  const [fieldVisible, setFieldVisible] = useState(false);
  const [naziv, setNaziv] = useState('');

  const handleSubmit = () => {
    dispatch(
      storeKategorijaRobe({
        naziv,
      })
    );
    setFieldVisible(false);
  };

  const handleChange = (event) => {
    setNaziv(event.target.value);
  };

  return (
    <>
      {fieldVisible ? (
        <>
          {/* ovamo mora biti link za pravljenje nove kat */}
          <label className="form__label">Kreirajte novu kategoriju</label>
          <input
            name="naziv"
            className="form__input mb-10"
            placeholder="Naziv kategorije"
            value={naziv}
            onChange={handleChange}
          />
          <button className="btn btn__dark jc-center" onClick={handleSubmit}>
            Kreiraj kategoriju
          </button>
        </>
      ) : (
        <Link className="link" onClick={() => setFieldVisible(true)}>
          + Kreiraj kategoriju
        </Link>
      )}
    </>
  );
};

export default CreateKategorija;
