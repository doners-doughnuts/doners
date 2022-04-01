import instance from 'services/axios';

type epilogueType = {
  epilogueDescription: string;
  epilogueTitle: string;
  epilogueId?: string;
};

export const registEpilogue = async (formData: any) => {
  const result = await instance.post(`/epilogue`, formData);
  return result;
};

export const modifyEpilogue = async (body: epilogueType) => {
  const result = await instance.patch(`/epilogue`, body);
  return result;
};

export const getEpilogueList = async (sequence: number) => {
  console.log(sequence);
  const result = await instance.get(`/epilogue/list/${sequence}`);
  return result;
};

export const getEpilogueDetail = async (epilogue_id: string) => {
  const result = await instance.get(`/epilogue/${epilogue_id}`);
  return result;
};

export const deleteEpilogue = async (epilogue_id: string) => {
  const result = await instance.delete(`/epilogue/${epilogue_id}`);
  return result;
};
