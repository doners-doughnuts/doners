import instance from 'services/axios';

type registType = {
  communityDescription: string;
  communityTitle: string;
};

export const registBoard = async (body: registType) => {
  const result = await instance.post(`/community/register`, body);
  return result;
};

export const getBoardList = async (sequence: number) => {
  console.log(sequence);
  const result = await instance.get(`/community/list/${sequence}`);
  return result;
};
