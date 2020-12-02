import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPreduzeca,
  setPreduzece,
} from '../../store/actions/PreduzecaActions';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const PreduzecaTable = ({ preduzeca }) => {
  const dispatch = useDispatch();

  const preduzece = useSelector(preduzeceSelector());

  const preduzecaRow = ({ item }) => (
    <tr
      onClick={() => dispatch(setPreduzece(item))}
      style={{
        backgroundColor: preduzece.id === item.id ? '#F9FAFB' : 'white',
      }}
    >
      <td>
        <p>{item.kratki_naziv}</p>
        <h3 class="heading-quaternary">{item.grad}</h3>
      </td>
      <td>{item.pib}</td>
      <td>{item.telefon}</td>
      <td>{item.partneri?.length ? 'Partner' : 'Dodaj partnera'}</td>
    </tr>
  );

  return (
    <>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <h3 className="heading-quaternary">Preduzeće</h3>
              </th>
              <th scope="col">
                <h3 className="heading-quaternary">PIB</h3>
              </th>
              <th scope="col">
                <h3 className="heading-quaternary">Telefon</h3>
              </th>
              <th scope="col">
                <h3 className="heading-quaternary">Partner</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <List data={preduzeca.data} renderItem={preduzecaRow} />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={preduzeca}
        onPageChange={(page) => dispatch(getPreduzeca({ page }))}
      />
    </>
  );
};

export default PreduzecaTable;
