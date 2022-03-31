import instance from 'services/axios';

const COMMON = '/admin';

export const getApplicationList = async () => {
  const response = await instance.get(COMMON + '/');

  console.log(response);

  return response.data;
};
