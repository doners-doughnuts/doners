import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // TODO timeout 설정
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

/* Apply Interceptor */
// HTTP request interceptor
instance.interceptors.request.use(
  (config) => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const Juser = JSON.parse(user);
      if (Juser.accessToken) {
        config.headers!.Authorization = 'Bearer ' + Juser.accessToken;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
    // return false;
  }
);

// HTTP response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      const history = createBrowserHistory();
      console.log(error.response);
      switch (error.response.status) {
        /* 'JWT expired' exeption */
        case 400:
          console.log('400 ERROR, not authorized.');
          break;
        case 401:
          history.push('/signup');
          // 강제로 새로고침 (임시)
          window.location.reload();
          toast.info('세션이 만료되었습니다. 다시 로그인해주세요.');
          //  2. Reset authentication from localstorage/sessionstorage
          sessionStorage.removeItem('user');
          // logout();
          break;
        case 404:
          console.log('404error!');
          break;
        case 409:
          console.log('409error!');
          break;
        default:
      }
    } else {
      // ex. 서버 키지 않은 경우
    }
    return Promise.reject(error);
    // return false;
  }
);

export const multipartInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // TODO timeout 설정
  timeout: 30000,
  headers: {
    'Content-Type': `multipart/form-data`,
  },
});

export default instance;
