import { toast } from 'react-toastify';

export const notifySuccess = (message) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 2200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });

export const notifyError = (message) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
