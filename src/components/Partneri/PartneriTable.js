import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PARTNERI } from '../../constants/routes';
import { getPartneri } from '../../store/actions/PartneriActions';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const PartneriTable = ({ partneri }) => {
  const dispatch = useDispatch();

  const partneriRow = ({ item }) => (
    <Link to={PARTNERI.SHOW.replace(':id', item.id)}>
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.kontakt_ime}</td>
        <td>{item.kontakt_prezime}</td>
        <td>{item.kontakt_telefon}</td>
      </tr>
    </Link>
  );

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Kontatk ime</th>
            <th scope="col">Kontakt prezime</th>
            <th scope="col">Kontakt telefon</th>
          </tr>
        </thead>
        <tbody>
          <List data={partneri.data} renderItem={partneriRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={partneri}
        onPageChange={(page) => dispatch(getPartneri({ page }))}
      />
    </>
  );
};

export default PartneriTable;
