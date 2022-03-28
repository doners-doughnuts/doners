import instance from 'services/axios';

type boardType = {
  communityDescription: string;
  communityTitle: string;
};

export const registBoard = async (body: boardType) => {
  const result = await instance.post(`/community`, body);
  return result;
};

export const modifyBoard = async (body: boardType) => {
  const result = await instance.patch(`/community`, body);
  return result;
};

export const getBoardList = async (sequence: number) => {
  console.log(sequence);
  const result = await instance.get(`/community/list/${sequence}`);
  return result;
};

export const getBoardDetail = async (community_id: string) => {
  const result = await instance.get(`/community/${community_id}`);
  return result;
};

export const deleteBoard = async (community_id: string) => {
  const result = await instance.delete(`/community/${community_id}`);
  return result;
};
