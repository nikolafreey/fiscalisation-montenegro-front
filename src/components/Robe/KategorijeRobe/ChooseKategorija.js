import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKategorijeRobe } from '../../../store/actions/KategorijeRobeActions';
import { kategorijeRobeSelector } from '../../../store/selectors/KategorijeRobeSelector';

const ChooseKategorija = () => {
  const dispatch = useDispatch();
  
  const kategorije = useSelector(kategorijeRobeSelector());

  useEffect(() => {
    dispatch(getKategorijeRobe());
  }, [dispatch])

  return kategorije.map((kategorija, index) => (
    <div key={kategorija.id}>
      <input type='checkbox' name={`kategorija[${index}]`}/>
      <label>{kategorija.naziv}</label>
      {
        kategorija.podkategorije_robe.map((podkategorija, index_podkategorija) => (
        <div key={podkategorija.id}> 
          <input style={{marginLeft: '2rem'}} type='checkbox' name={`kategorija[${index}].podkategorija[${index_podkategorija}]`}/>
          <label>{podkategorija.naziv}</label>
        </div>
        ))
      }
    </div>
  ));
}

export default ChooseKategorija;
