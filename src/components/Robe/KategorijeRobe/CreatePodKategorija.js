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
    dispatch(storePodkategorijaRobe({ naziv, kategorija_id: kategorija.value }));
    setFieldVisible(false);
  };

  const handleChange = (event) => {
    setNaziv(event.target.value);
  };

  return (
    <div>
      {fieldVisible ? (
        <div>
          <input name="naziv" value={naziv} onChange={handleChange} />
          <Async
            loadOptions={kategorijeRobeService.getKategorijeRobeDropdown}
            defaultOptions
            cacheOptions
            value={kategorija}
            onChange={setKategorija}
          />
          <button onClick={handleSubmit}>Kreiraj podkategoriju</button>
        </div>
      ) : (
        <p onClick={() => setFieldVisible(true)}>Kreiraj podkategoriju</p>
      )}
    </div>
  );
};

export default CreatePodKategorija;
