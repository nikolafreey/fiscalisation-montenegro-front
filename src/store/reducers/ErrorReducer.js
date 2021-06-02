import produce from 'immer';
import {
  GLOBAL_ERROR_SET,
  LOGIN_ERROR_SET,
} from '../actionTypes/ErrorActionTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialState = {
  globalError: null,
  loginError: {},
};

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const errorReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case GLOBAL_ERROR_SET:
        draft.globalError = action.payload;
        console.log('action.payload', action.payload);
        // console.log('draft.globalError.length', draft.globalError.length);
        if (
          action.payload
          // Object.keys(action.payload).length !== 0 &&
          // action.payload.constructor === Object
        ) {
          var errors = action.payload?.response
            ? action.payload.response?.data?.errors
            : '';
          var errormessage = '';

          if (errors) {
            Object.keys(errors).forEach(function (key) {
              errormessage += errors[key] + '<br />';
            });
          }

          errormessage = action.payload?.response
            ? action.payload.response?.data?.error
            : '';

          // if ((errormessage = 'Nedostaje Bearer token')) {
          //   toast.error(
          //     'Greška prilikom logovanja, pogrešni kredencijali!',
          //     toastSettings
          //   );
          //   return;
          // }
          if (errormessage !== '' && errormessage !== ' ') {
            toast.error('Obavještenje: ' + errormessage, toastSettings);
          }

          // let objKey = Object.keys(action.payload);
          // toast.error(
          //   'Greška: ' + action.payload?.errors[objKey[0]],
          //   toastSettings
          // );
        }
        if (draft.globalError && draft.globalError.length !== 0) {
          toast.error('Obavještenje: ' + action.payload, toastSettings);
        }
        break;
      case LOGIN_ERROR_SET:
        draft.loginError = action.payload;
        console.log('action.payload loginErrorSet; ', action.payload);
        if (
          Object.keys(action.payload).length !== 0 &&
          action.payload.constructor === Object
        ) {
          toast.error(
            'Nije moguć ulazak: ' + action.payload.message,
            toastSettings
          );
        }
        break;
      default:
        break;
    }
  });

export default errorReducer;
