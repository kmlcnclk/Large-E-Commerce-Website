import * as actionTypes from '../Actions/actionTypes.actions';
import initialState from './initialState';

export default function errorMessageReducer(
  state = initialState.errorMessage,
  action
) {
  switch (action.type) {
    case actionTypes.ERROR_MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
