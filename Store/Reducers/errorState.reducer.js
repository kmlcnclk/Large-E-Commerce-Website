import * as actionTypes from '../Actions/actionTypes.actions';
import initialState from './initialState';

export default function errorStateReducer(
  state = initialState.errorState,
  action
) {
  switch (action.type) {
    case actionTypes.ERROR_STATE:
      return action.payload;

    default:
      return state;
  }
}
