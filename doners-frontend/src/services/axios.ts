import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // TODO timeout 설정
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
  },
});

/* Apply Interceptor */
// HTTP request interceptor
instance.interceptors.request.use(
  (config) => {
    const item = localStorage.getItem('user');
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
      console.log(error.response);
      switch (error.response.status) {
        /* 'JWT expired' exeption */
        case 400:
          console.log('400 ERROR, not authorized.');
          break;
        case 401:
          console.log('401error!');
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
