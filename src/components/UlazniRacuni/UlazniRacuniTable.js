import { routerActions } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRacuni, setRacun } from '../../store/actions/RacuniActions';
import { getUlazniRacuni } from '../../store/actions/UlazniRacuniActions';
import { racunSelector } from '../../store/selectors/RacuniSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import UlazniRacuniTableRow from './UlazniRacuniTableRow';

const UlazniRacuniTable = ({ ulazniRacuni }) => {
  const dispatch = useDispatch();
  console.log('ulazniRacuni', ulazniRacuni);

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="w-5">
                <span className="heading-quaternary"> </span>
              </th>
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
              data={ulazniRacuni.data || []}
              renderItem={UlazniRacuniTableRow}
            />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={ulazniRacuni}
        onPageChange={(page) => dispatch(getUlazniRacuni({ page }))}
      />
    </>
  );
};

export default UlazniRacuniTable;
