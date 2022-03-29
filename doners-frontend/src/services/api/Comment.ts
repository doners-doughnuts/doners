import instance from 'services/axios';

type commentType = {
  commentDescription: string;
  commentId?: string;
  communityId?: string;
  epilougeId?: string;
};

export const registComment = async (body: commentType) => {
  const result = await instance.post(`/comment`, body);
  return result;
};

export const getComments = async (community_id: string) => {
  const result = await instance.get(`/comment/community/${community_id}`);
  return result;
};

export const deleteComments = async (comment_id: string) => {
  const result = await instance.delete(`/comment/delete/${comment_id}`);
  return result;
};
