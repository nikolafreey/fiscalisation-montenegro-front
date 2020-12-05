import React, { useState } from 'react';
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux';
import { getPreduzeca } from '../../../store/actions/PreduzecaActions';

const searchDebounced = debounce((callback) => callback(), 500);

const SearchForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState('');

  const handleSearch = (search) => {
    dispatch(getPreduzeca({search}));
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
    searchDebounced(() => handleSearch(event.target.value));
  } 
  
  return (
    <form className="search">
      <button className="search__button" type="submit"></button>
      <input
        name="search"
        placeholder="Naziv ili PIB preduzeca"
        class="search__input"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchForm;
