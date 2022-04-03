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
    const item = sessionStorage.getItem('accessToken');
    if (typeof item === 'string') {
      const user = JSON.parse(item);
      if (user.accessToken) {
        // For Spring Boot back-end
        config.headers!.Authorization = 'Bearer ' + user.accessToken;
        // for Node.js Express back-end
        //// return { 'x-access-token': user.accessToken };
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
          // navigate('signup');
          toast.info('세션이 만료되었습니다. 다시 로그인해주세요.');
          history.push('/signup');
          // console.log('401error!');
          //! history.push() 만 했을 때, url만 변경이 되고, 페이지가 reload되지 않는 문제
          // (https://stackoverflow.com/questions/42941708/react-history-push-is-updating-url-but-not-navigating-to-it-in-browser)
          // 강제로 새로고침 (임시)
          window.location.reload();
          //  2. Reset authentication from localstorage/sessionstorage
          sessionStorage.removeItem('accessToken');
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
