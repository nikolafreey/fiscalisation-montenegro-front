import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
      storePodkategorijaRobe({ naziv, kategorija_id: kategorija.value })
    );
    setFieldVisible(false);
  };

  const handleChange = (event) => {
    setNaziv(event.target.value);
  };

  return (
    <div>
      {fieldVisible ? (
        <div>
          <label class="form__label">Kreirajte novu podkategoriju</label>

          <input
            name="naziv"
            class="form__input mb-10"
            placeholder="Naziv podkategorije"
            value={naziv}
            onChange={handleChange}
          />
          <Async
            class="form__input mb-10"
            loadOptions={kategorijeRobeService.getKategorijeRobeDropdown}
            defaultOptions
            cacheOptions
            value={kategorija}
            onChange={setKategorija}
          />
          <button class="btn btn__dark jc-center" onClick={handleSubmit}>
            Kreiraj podkategoriju
          </button>
        </div>
      ) : (
        <p class="link" onClick={() => setFieldVisible(true)}>
          +Kreiraj podkategoriju
        </p>
      )}
    </div>
  );
};

export default CreatePodKategorija;
