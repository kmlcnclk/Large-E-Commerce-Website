import React from 'react';
import { errorState } from 'Store/Actions/error.actions';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Error() {
  const dispatch = useDispatch();

  const errorMsg = useSelector((state) => state.errorMessageReducer);

  return (
    <div>
      <Alert
        variant="danger"
        style={{ marginTop: '1rem', textAlign: 'center', width: 'auto' }}
        onClose={() => dispatch(errorState(false))}
        dismissible
      >
        <Alert.Heading>{errorMsg}</Alert.Heading>
      </Alert>
    </div>
  );
}

export default Error;
