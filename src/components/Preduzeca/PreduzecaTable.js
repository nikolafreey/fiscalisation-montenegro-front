import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPreduzeca,
  setPreduzece,
} from '../../store/actions/PreduzecaActions';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import PreduzecaTableRow from './PreduzecaTableRow';

const PreduzecaTable = ({ preduzeca }) => {
  const dispatch = useDispatch();

  const selectedPreduzece = useSelector(preduzeceSelector());

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <span className="heading-quaternary">Preduzeće</span>
              </th>
              <th>
                <span className="heading-quaternary">PIB</span>
              </th>
              <th>
                <span className="heading-quaternary">Telefon</span>
              </th>
              <th>
                <span className="heading-quaternary">Partner</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <List
              data={preduzeca.data}
              renderItem={PreduzecaTableRow}
              onItemClick={(item) => dispatch(setPreduzece(item))}
              selectedId={selectedPreduzece.id}
            />
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
