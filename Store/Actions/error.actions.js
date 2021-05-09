import * as actionTypes from './actionTypes.actions';

export const errorState = (state) => {
  return {
    type: actionTypes.ERROR_STATE,
    payload: state,
  };
};
export const errorMessage = (message) => {
  return {
    type: actionTypes.ERROR_MESSAGE,
    payload: message,
  };
};
