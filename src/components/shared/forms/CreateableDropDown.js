import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Label from './Label';
import { useDispatch, useSelector } from 'react-redux';
import { storeFizickoLice } from '../../../store/actions/FizickaLicaActions';
import { storePreduzece } from '../../../store/actions/PreduzecaActions';

const AysncCreatableDropDown = ({
  label,
  defaultOptions = true,
  loadOptions,
  ...props
}) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);
  const dispatch = useDispatch();

  const { error } = meta;
  const { setValue } = helpers;
  console.log('proops', props);
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <AsyncCreatableSelect
        name={field.name}
        onChange={(option) => {
          if (props.isMulti) {
            setValue(option.map((item) => item.value));
          } else setValue(option.value);
          console.log('asdf', option);
          setSelectedLabel(option);
        }}
        value={selectedLabel}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        isSearchable
        {...props}
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default AysncCreatableDropDown;
