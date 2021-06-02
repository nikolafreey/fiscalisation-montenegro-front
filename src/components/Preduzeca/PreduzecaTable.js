import { routerActions } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { PREDUZECA } from '../../constants/routes';
import {
  getPreduzeca,
  setPreduzece,
} from '../../store/actions/PreduzecaActions';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import PreduzecaTableRow from './PreduzecaTableRow';
import { ReactComponent as PlusLightSvg } from '../../assets/icon/plusLight.svg';

const PreduzecaTable = ({ preduzeca, partneri, openInfo }) => {
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
              onItemClick={(item) => {dispatch(setPreduzece(item)); openInfo(true)}}
              selectedId={selectedPreduzece?.id}
              key={selectedPreduzece?.id}
              partneri={partneri}
            />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={preduzeca}
        onPageChange={(page) => dispatch(getPreduzeca({ page }))}
      />
      <div className="df jc-center ai-c fd-column">
        <hr className="w-60 " />
        <p className="mb-25 p-margin">
          ili kreirajte novo preduzeće ako nije u listi
        </p>
        <Link exact to={PREDUZECA.CREATE}>
          <button
            onClick={() => {
              dispatch(setPreduzece({}));
            }}
            className="btn btn__primary mb-25"
          >
            <PlusLightSvg className="icon icon__light lg" />
            Novo Preduzeće
          </button>
        </Link>
      </div>
    </>
  );
};

export default PreduzecaTable;
