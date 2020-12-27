import { useFormikContext } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux';
import { stavkeRobeSelector, stavkeUslugeSelector } from '../../../store/selectors/RacuniSelector';
import StavkeDropdown from './StavkeDropdown';

const BezgotovinskiStavkeFieldArray = ({insert, remove}) => {
  const { values } = useFormikContext();
  //const stavkeRobe = useSelector(stavkeRobeSelector());
  //const stavkeUsluge = useSelector(stavkeUslugeSelector());
  
  return (
    <div>
      { values.stavke.map((stavka, index) => (
        <div class="form__group w-28">
        <StavkeDropdown
          name={`stavke.${index}`}
          className="form__input"
          label={'Stavke'}
        />
        </div>
      ))

      }
    </div>
  )
}

export default BezgotovinskiStavkeFieldArray
