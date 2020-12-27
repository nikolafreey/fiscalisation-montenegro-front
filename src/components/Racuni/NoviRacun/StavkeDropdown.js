import { ErrorMessage, useField } from 'formik';
import { debounce } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getStavke } from '../../../store/actions/RacuniActions';
import { stavkeRobeSelector, stavkeUslugeSelector } from '../../../store/selectors/RacuniSelector';
import Label from '../../shared/forms/Label';

const searchDebounced = debounce((callback) => callback(), 500);

const StavkeDropdown = ({ label, ...props }) => {
  const dispatch = useDispatch();

  const robe = useSelector(stavkeRobeSelector()) || {data: []};
  const usluge = useSelector(stavkeUslugeSelector()) || {data: []};

  const options = [
    ...robe.data.map(roba => ({value: roba, label: roba.roba.naziv})),
    ...usluge.data.map(usluga => ({value: usluga, label: usluga.naziv}))
  ];

  function onInputChange(searchValue) {
    searchDebounced(() => dispatch(getStavke({search: searchValue || undefined})));
  }

  function onStavkaChange(option) {
    setValue(option.value);
  }

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <Select
        options={options}
        name={field.name}
        onChange={onStavkaChange}
        onInputChange={onInputChange}
        value={{label: field.value.roba?.naziv || field.value.naziv, value: field.value}}
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default StavkeDropdown;
