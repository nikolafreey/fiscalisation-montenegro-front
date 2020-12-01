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
      style={{ backgroundColor: preduzece.id === item.id ? 'gray' : 'white' }}
    >
      <th scope="row">{item.id}</th>
      <td>{item.ime}</td>
      <td>{item.prezime}</td>
      <td>{item.email}</td>
      <td>{item.partneri?.length ? 'Partner' : 'Dodaj partnera'}</td>
    </tr>
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">E-mail</th>
            <th scope="col">Partner</th>
          </tr>
        </thead>
        <tbody>
          <List data={preduzeca.data} renderItem={preduzecaRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={preduzeca}
        onPageChange={(page) => dispatch(getPreduzeca({ page }))}
      />
    </>
  );
};

export default PreduzecaTable;
