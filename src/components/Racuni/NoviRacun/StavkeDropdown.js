import { ErrorMessage, useField } from 'formik';
import { debounce } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getStavke } from '../../../store/actions/RacuniActions';
import { getRoba, setRoba } from '../../../store/actions/RobeActions';
import { getUsluga, setUsluga } from '../../../store/actions/UslugeActions';
import {
  stavkeRobeSelector,
  stavkeUslugeSelector,
} from '../../../store/selectors/RacuniSelector';
import Label from '../../shared/forms/Label';

const searchDebounced = debounce((callback) => callback(), 200);

const StavkeDropdown = ({ label, onChangeExtra = null, ...props }) => {
  const dispatch = useDispatch();

  const robe = useSelector(stavkeRobeSelector()) || { data: [] };
  const usluge = useSelector(stavkeUslugeSelector()) || { data: [] };

  const options = [
    ...robe.data.map((roba) => ({ value: roba, label: roba.roba.naziv })),
    ...usluge.data.map((usluga) => ({ value: usluga, label: usluga.naziv })),
  ];

  console.log('robe', robe);
  console.log('usluge', usluge);
  console.log('options', options);

  function onInputChange(searchValue) {
    searchDebounced(() =>
      dispatch(getStavke({ search: searchValue || undefined }))
    );
  }

  function onStavkaChange(option) {
    setValue({ ...option.value, kolicina: 0, tip_popusta: 'procenat' });
    console.log('option', option);
    if (option?.value?.roba_id) {
      dispatch(getRoba(option.value.roba_id));
      dispatch(setUsluga({}));
    } else {
      dispatch(getUsluga(option.value.id));
      dispatch(setRoba({}));
    }
    if (onChangeExtra) onChangeExtra(option.value);
  }

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;
  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#F3F4F6',
      borderRadius: 4,
      height: '45px',
      minHeight: 'unset',
    }),
  };
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <Select
        styles={selectStyle}
        options={options}
        name={field.name}
        onChange={onStavkaChange}
        onInputChange={onInputChange}
        value={{
          label: field.value?.roba?.naziv || field.value?.naziv,
          value: field.value,
        }}
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default StavkeDropdown;
