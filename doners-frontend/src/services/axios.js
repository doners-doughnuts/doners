import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // TODO timeout 설정
  timeout: 30000,
  Headers: {
    'Content-type': 'application/json',
  },
});

/* Apply Interceptor */
// HTTP request interceptor
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    //
    if (user && user.accessToken) {
      // For Spring Boot back-end
      config.headers.Authorization = 'Bearer ' + user.accessToken;
      // for Node.js Express back-end
      //// return { 'x-access-token': user.accessToken };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// HTTP response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        /* 'JWT expired' exeption */
        case 401:
          // console.log(error.response);
          break;
        default:
      }
    } else {
      // ex. 서버 키지 않은 경우
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;
