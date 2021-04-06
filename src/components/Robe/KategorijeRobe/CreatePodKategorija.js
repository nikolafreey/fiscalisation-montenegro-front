import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Async from 'react-select/async';
import { kategorijeRobeService } from '../../../services/KategorijeRobeService';
import { storePodkategorijaRobe } from '../../../store/actions/KategorijeRobeActions';

const CreatePodKategorija = () => {
  const dispatch = useDispatch();

  const [fieldVisible, setFieldVisible] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [kategorija, setKategorija] = useState(null);

  const handleSubmit = () => {
    dispatch(
      storePodkategorijaRobe({
        naziv,
        kategorija_id: kategorija.value,
        preduzece_id: 1,
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
          {/* ovamo mora biti link za pravljenje nove podkat. */}
          <label className="form__label">Kreirajte novu podkategoriju</label>

          <input
            name="naziv"
            className="form__input mb-10"
            placeholder="Naziv podkategorije"
            value={naziv}
            onChange={handleChange}
          />
          <Async
            className="mb-10"
            loadOptions={kategorijeRobeService.getKategorijeRobeDropdown}
            defaultOptions
            cacheOptions
            value={kategorija}
            onChange={setKategorija}
          />
          <button className="btn btn__primary jc-center" onClick={handleSubmit}>
            Kreiraj podkategoriju
          </button>
        </>
      ) : (
        <Link className="link" onClick={() => setFieldVisible(true)}>
          + Kreiraj podkategoriju
        </Link>
      )}
    </>
  );
};

export default CreatePodKategorija;
