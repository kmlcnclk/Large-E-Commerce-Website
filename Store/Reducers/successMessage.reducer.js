import * as actionTypes from '../Actions/actionTypes.actions';
import initialState from './initialState';

export default function successMessageReducer(
  state = initialState.successMessage,
  action
) {
  switch (action.type) {
    case actionTypes.SUCCESS_MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
