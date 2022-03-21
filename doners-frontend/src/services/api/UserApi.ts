import instance from 'services/axios';

const COMMON = '/user';

export const login = async (userAccount: any) => {
  const response = await instance.get(COMMON, {
    params: {
      userAccount,
    },
  });
  return response.data;
};
