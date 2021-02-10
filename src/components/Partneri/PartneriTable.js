import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPartneri,
  setPartner,
} from '../../store/actions/PartneriActions';
import { partnerSelector } from '../../store/selectors/PartneriSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import PartneriTableRow from './PartneriTableRow';

const PartneriTable = ({ partneri }) => {
  const dispatch = useDispatch();

  const selectedPartner = useSelector(partnerSelector());

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <span className="heading-quaternary">Preduzeće/Fizičko lice</span>
              </th>
              <th>
                <span className="heading-quaternary">PIB/JMBG</span>
              </th>
              <th>
                <span className="heading-quaternary">Telefon</span>
              </th>
              <th>
                <span className="heading-quaternary">Izmijeni/Obriši</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <List
              data={partneri.data}
              renderItem={PartneriTableRow}
              onItemClick={(item) => dispatch(setPartner(item))}
              selectedId={selectedPartner.id}
              key={partneri.preduzece?.id}
            />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={partneri}
        onPageChange={(page) => dispatch(getPartneri({ page }))}
      />
    </>
  );
};

export default PartneriTable;
