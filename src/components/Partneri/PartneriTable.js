import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartneri, setPartner } from '../../store/actions/PartneriActions';
import { partnerSelector } from '../../store/selectors/PartneriSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const PartneriTable = ({ partneri }) => {
  const dispatch = useDispatch();

  const partner = useSelector(partnerSelector());

  const partneriRow = ({ item }) => (
    <tr
      onClick={() => dispatch(setPartner(item))}
      style={{ backgroundColor: partner.id === item.id ? 'gray' : 'white' }}
    >
      <th scope="row">{item.id}</th>
      <td>{item.kontakt_ime}</td>
      <td>{item.kontakt_prezime}</td>
      <td>{item.kontakt_telefon}</td>
    </tr>
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
