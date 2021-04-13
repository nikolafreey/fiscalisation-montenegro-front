import { ErrorMessage, useField } from 'formik';
import { placeholder } from 'i18n-js';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { GRUPE, PROIZVODJACI } from '../../../constants/routes';
import { grupeService } from '../../../services/GrupeService';
import { proizvodjacService } from '../../../services/ProizvodjacService';
import Label from './Label';

const DropDown = ({
  onChangeExtra = null,
  label,
  defaultOptions = true,
  loadOptions,
  defaultValue,
  ...props
}) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;

  const [blurred, setBlurred] = useState(false);

  const [nazivGrupe, setNazivGrupe] = useState('');
  const [nazivProizvodjaca, setNazivProizvodjaca] = useState('');
  const selectRef = useRef();

  const handleProizvodjac = () => {
    const nazivProizvodjaca = prompt('Unesite naziv proizvodjaca: ');
    setNazivProizvodjaca(nazivProizvodjaca);

    proizvodjacService
      .storeProizvodjac({
        naziv: nazivProizvodjaca,
      })
      .then((data) => {
        console.log('data', data);
        setSelectedLabel({ value: data.data.id, label: data.data.naziv });
        selectRef.current.loadOptions(
          proizvodjacService.getProizvodjaciDropdown
        );
      });
  };

  const handleGrupe = () => {
    const nazivGrupe = prompt('Unesite naziv grupe: ');
    setNazivGrupe(nazivGrupe);

    grupeService.storeGrupa({ naziv: nazivGrupe }).then((data) => {
      setSelectedLabel({ value: data.data.id, label: data.data.naziv });
      selectRef.current.loadOptions(grupeService.getGrupeDropdown);
    });
  };

  return (
    <div>
      <Label htmlFor={props.id || props.name} className="form__label">
        {label}
      </Label>
      {props.name === 'proizvodjac_robe_id' && (
        <button
          className="link"
          to={PROIZVODJACI.CREATE}
          onClick={handleProizvodjac}
        >
          + Novi
        </button>
      )}
      {props.name === 'grupa_id' && (
        <button className="link" to={GRUPE.CREATE} onClick={handleGrupe}>
          + Nova
        </button>
      )}
      <AsyncSelect
        ref={selectRef}
        name={field.name}
        onChange={(option) => {
          if (props.isMulti) {
            setValue(option.map((item) => item.value));
          } else {
            setSelectedLabel(option.label);
            setValue(option.value);
            console.log('dropdown option', option);
          }
          setSelectedLabel(option);
          if (onChangeExtra) onChangeExtra(option);
        }}
        value={selectedLabel !== null ? selectedLabel : defaultValue}
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        isSearchable
        onBlur={() => setBlurred(true)}
        {...props}
      />
      {blurred && meta.error ? <div className="error">{meta.error}</div> : null}
      {/* {!!error && <ErrorMessage>{error}</ErrorMessage>} */}
    </div>
  );
};

export default DropDown;
