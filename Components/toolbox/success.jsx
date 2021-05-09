import React from 'react';
import { successState } from 'Store/Actions/success.actions';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Success() {
  const dispatch = useDispatch();

  const successMsg = useSelector((state) => state.successMessageReducer);

  return (
    <div>
      <Alert
        variant="success"
        style={{ marginTop: '1rem', textAlign: 'center', width: 'auto' }}
        onClose={() => dispatch(successState(false))}
        dismissible
      >
        <Alert.Heading>{successMsg}</Alert.Heading>
      </Alert>
    </div>
  );
}

export default Success;
