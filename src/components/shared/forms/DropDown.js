import { ErrorMessage, useField } from 'formik';
import { placeholder } from 'i18n-js';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { GRUPE, PROIZVODJACI } from '../../../constants/routes';
import { grupeService } from '../../../services/GrupeService';
import { proizvodjacService } from '../../../services/ProizvodjacService';
import Label from './Label';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const DropDown = React.memo(
  ({
    onChangeExtra = null,
    label,
    defaultOptions = true,
    loadOptions,
    defaultValue,
    ...props
  }) => {
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [isInitialValid, setIsInitialValid] = useState(false);

    const [field, meta, helpers] = useField(props);

    const { error } = meta;
    const { setValue, setError } = helpers;

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
          setSelectedLabel({ value: data.data.id, label: data.data.naziv });
          setIsInitialValid(true);
          selectRef.current.loadOptions(
            proizvodjacService.getProizvodjaciDropdown
          );
        })
        .catch((err) => {
          toast.error(
            'Desila se greška prilikom unosa proizvođača: Proizvođač već postoji!' +
              err,
            toastSettings
          );
        });
    };

    const handleGrupe = () => {
      const nazivGrupe = prompt('Unesite naziv grupe: ');
      setNazivGrupe(nazivGrupe);

      grupeService
        .storeGrupa({ naziv: nazivGrupe })
        .then((data) => {
          setSelectedLabel({ value: data.data.id, label: data.data.naziv });
          setValue(data.data.id);
          selectRef.current.loadOptions(grupeService.getGrupeDropdown);
          setIsInitialValid(true);
          setError(null);
        })
        .catch((err) => {
          // console.log('errBefore', err.response.data.errors);
          // var errormessage = '';
          // Object.keys(err.response.data.errors).forEach(function (key) {
          //   errormessage += err[key] + '<br />';
          // });
          // console.log('err', errormessage);

          // toast.error(
          //   'Desila se greška prilikom unosa grupe: ' + errormessage,
          //   toastSettings
          // );

          toast.error(
            'Desila se greška prilikom unosa grupe: ' + err.response &&
              err.response.data.errors.naziv[0],
            toastSettings
          );
        });
    };
    const selectStyle = {
      control: (styles) => ({
        ...styles,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        height: '45px',
        minHeight: 'unset',
      }),
    };

    console.log('field.name', field.name);

    return (
      <React.Fragment key={props.key}>
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
          styles={selectStyle}
          cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          isSearchable
          onBlur={() => setBlurred(true)}
          isInitialValid={isInitialValid}
          isValid={isInitialValid}
          {...props}
        />
        {blurred && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        {/* {!!error && <ErrorMessage>{error}</ErrorMessage>} */}
      </React.Fragment>
    );
  }
);

export default DropDown;
