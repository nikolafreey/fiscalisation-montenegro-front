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
        if (draft.globalError.length !== 0) {
          let objKey = Object.keys(action.payload);
          toast.error(
            'Greška: ' + action.payload?.errors[objKey[0]],
            toastSettings
          );
        }
        break;
      case LOGIN_ERROR_SET:
        draft.loginError = action.payload;
        if (
          Object.keys(action.payload).length !== 0 &&
          action.payload.constructor === Object
        ) {
          toast.error(
            'Greška Prilikom Logovanja: ' + action.payload.message,
            toastSettings
          );
        }
        break;
      default:
        break;
    }
  });

export default errorReducer;
