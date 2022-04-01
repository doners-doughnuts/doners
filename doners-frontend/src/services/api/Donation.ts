import instance from 'services/axios';

type donationType = {
  category: string;
  page: string;
  sort: string;
};

export const getDonationList = async (
  category: string,
  sort: string,
  page: number
) => {
  const result = await instance.get(
    `/donation?category=${category}&page=${page}&sort=${sort}`
  );
  return result;
};

export const getDonationDetail = async (donation_id: string) => {
  const result = await instance.get(`/donation/${donation_id}`);
  return result;
};
