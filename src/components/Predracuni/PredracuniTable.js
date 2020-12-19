import { routerActions } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPredracuni } from '../../store/actions/PredracuniActions';
import { predracunSelector } from '../../store/selectors/PredracuniSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import PredracuniTableRow from './PredracunTableRow';

const PredracuniTable = ({ predracuni }) => {
  const dispatch = useDispatch();

  const selectedRacun = useSelector(predracunSelector());

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <span className="heading-quaternary">Broj</span>
              </th>
              <th>
                <span className="heading-quaternary">Preduzeće/Lice</span>
              </th>
              <th className="dshow-cell">
                <span className="heading-quaternary">Iznos bez PDV</span>
              </th>
              <th className="dshow-cell">
                <span className="heading-quaternary">PDV</span>
              </th>
              <th>
                <span className="heading-quaternary">Iznos sa PDV</span>
              </th>
              <th>
                <span className="heading-quaternary">Status</span>
              </th>
              <th>
                <span className="heading-quaternary">Datum</span>
              </th>
              <th className="w-5">
                <span className="heading-quaternary"> </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <List
              data={predracuni.data || []}
              renderItem={PredracuniTableRow}
            />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={predracuni}
        onPageChange={(page) => dispatch(getPredracuni({ page }))}
      />
    </>
  );
};

export default PredracuniTable;
