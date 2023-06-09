import axios, { AxiosError, isAxiosError } from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

const errorHandler = async (err: Error | AxiosError) => {
  let message: string;

  if (isAxiosError(err)) {
    if (err.response) {
      message = Object.values(err.response.data).join(' - ');
    } else {
      message = `${err.code} - ${err.message}`;
    }
  } else {
    message = 'An unexpected error has occurred, try again later!';
  }

  await Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    timer: 5000,
  });

  return Promise.reject(err);
};

api.interceptors.response.use(undefined, async (err: Error | AxiosError) => {
  return await errorHandler(err);
});

export default api;
