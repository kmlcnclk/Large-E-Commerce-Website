import * as actionTypes from './actionTypes.actions';

export const successState = (state) => {
  return {
    type: actionTypes.SUCCESS_STATE,
    payload: state,
  };
};
export const successMessage = (message) => {
  return {
    type: actionTypes.SUCCESS_MESSAGE,
    payload: message,
  };
};
