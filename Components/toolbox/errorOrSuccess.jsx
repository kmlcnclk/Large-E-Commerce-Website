import React from 'react';
import { useSelector } from 'react-redux';
import Error from './error';
import Success from './success';

function ErrorOrSuccess() {
  const error = useSelector((state) => state.errorStateReducer);
  const success = useSelector((state) => state.successStateReducer);

  return (
    <div>
      {error ? <Error /> : null}
      {success ? <Success /> : null}
    </div>
  );
}

export default ErrorOrSuccess;
