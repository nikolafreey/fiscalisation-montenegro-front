import React, { useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { getPreduzeca } from '../../../store/actions/PreduzecaActions';

const searchDebounced = debounce((callback) => callback(), 200);

const SearchForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const handleSearch = (search) => {
    let filtered = search.replace(/[^0-9a-z]/gi, '');
    dispatch(getPreduzeca(filtered));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    searchDebounced(() => handleSearch(event.target.value));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search">
      <button className="search__button" type="button"></button>
      <input
        name="search"
        placeholder="Naziv ili PIB preduzeca"
        className="search__input"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchForm;
