import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Label from './Label';
import { useDispatch, useSelector } from 'react-redux';
import { storeFizickoLice } from '../../../store/actions/FizickaLicaActions';
import { storePreduzece } from '../../../store/actions/PreduzecaActions';
import { storeGrupa } from '../../../store/actions/GrupeActions';
import { grupeService } from '../../../services/GrupeService';
import { isNumber } from 'lodash';

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

  let tempLen = 0;
  let tempLength = grupeService
    .getGrupeDropdown()
    .then((data) => (tempLen = data));

  const onChangeHandler = (option) => {
    if (!isNumber(option.value)) {
      setValue(tempLen.slice(-1)[0].value + 1);
      dispatch(
        storeGrupa({
          naziv: option.value,
          popust_procenti: 0,
          popust_iznos: 0,
        })
      );
    }
    if (props.isMulti) {
      setValue(option.map((item) => item.value));
    } else setValue(option.value);
    setSelectedLabel(option);
  };

  // const handleCreate = async (inputValue) => {
  //   dispatch(
  //     storeGrupa({ naziv: inputValue, popust_procenti: 0, popust_iznos: 0 })
  //   );
  //   console.log('inputValue', inputValue);
  //   onChangeHandler(inputValue);
  //   setValue(inputValue);
  //   setSelectedLabel('test');
  // };

  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <AsyncCreatableSelect
        name={field.name}
        onChange={onChangeHandler}
        // onCreateOption={handleCreate}
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
