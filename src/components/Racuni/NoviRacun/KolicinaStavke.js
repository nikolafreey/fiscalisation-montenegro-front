import React from 'react'
import { useDispatch } from 'react-redux';
import {ReactComponent as StepperMinus} from '../../../assets/icon/stepper-minus.svg';
import {ReactComponent as StepperPlus} from '../../../assets/icon/stepper-plus.svg';
import { setKolicinaRobe, setKolicinaUsluge } from '../../../store/actions/RacuniActions';

const KolicinaStavke = ({ stavka={ kolicina: 0 }, usluga, roba }) => {
  const dispatch = useDispatch();

  const handlePlusClick = () => {
    if (usluga.id) {
      dispatch(setKolicinaUsluge(usluga, stavka.kolicina + 1));
    }
    if (roba.id) {
      dispatch(setKolicinaRobe(roba, stavka.kolicina + 1));
    }
  }

  const handleMinusClick = () => {
    if (usluga.id) {
      dispatch(setKolicinaUsluge(usluga, stavka.kolicina - 1));
    }
    if (roba.id) {
      dispatch(setKolicinaRobe(roba, stavka.kolicina - 1));
    }
  }

  const handleInputChange = (event) => {
    if (usluga.id) {
      dispatch(setKolicinaUsluge(usluga, event.target.value));
    }
    if (roba.id) {
      dispatch(setKolicinaRobe(roba, event.target.value));
    }
  }
  
  return (
    <div class="stepper">
      <button class="stepper__btn-left" onClick={handleMinusClick}>
        <StepperMinus />
      </button>
      <input onChange={handleInputChange} class="stepper__input" value={stavka.kolicina}/>
      <button class="stepper__btn-right" onClick={handlePlusClick}>
        <StepperPlus /> 
      </button>
    </div>
  )
}

export default KolicinaStavke;
