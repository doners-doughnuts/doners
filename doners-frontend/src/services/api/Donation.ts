import instance from 'services/axios';

type donationType = {
  category: string;
  page: string;
  sort: string;
  view?: boolean;
};

export const postDonation = async (formData: any) => {
  console.log(formData);

  for (let key of formData.keys()) {
    console.log(key);
  }
  for (let value of formData.values()) {
    console.log(value);
  }

  const result = await instance.post(`/donation`, formData);
  return result;
};

export const getDonationList = async (
  category: string,
  sort: string,
  page: number,
  view: boolean = false
) => {
  const result = await instance.get(
    `/donation?category=${category}&page=${page}&sort=${sort}&view=${view}`
  );
  return result;
};

export const getAvailableDonationList = async (
  category: string,
  sort: string,
  page: number,
  view: boolean
) => {
  console.log(category, sort, page, view);
  const result = await instance.get(
    `/donation?category=${category}&page=${page}&sort=${sort}&view=${view}`
  );
  return result;
};

export const getDonationDetail = async (donation_id: string) => {
  const result = await instance.get(`/donation/${donation_id}`);
  return result;
};
