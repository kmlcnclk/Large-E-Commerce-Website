import * as actionTypes from '../Actions/actionTypes.actions';
import initialState from './initialState';

export default function successStateReducer(
  state = initialState.successState,
  action
) {
  switch (action.type) {
    case actionTypes.SUCCESS_STATE:
      return action.payload;

    default:
      return state;
  }
}
