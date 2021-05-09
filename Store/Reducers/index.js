import { combineReducers } from 'redux';
import errorStateReducer from './errorState.reducer';
import errorMessageReducer from './errorMessage.reducer';
import successStateReducer from './successState.reducer';
import successMessageReducer from './successMessage.reducer';

const rootReducer = combineReducers({
  errorStateReducer,
  errorMessageReducer,
  successStateReducer,
  successMessageReducer,
});

export default rootReducer;
