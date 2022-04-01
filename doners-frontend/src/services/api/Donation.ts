import instance from 'services/axios';

type donationType = {
  category: string;
  page: string;
  sort: string;
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
  page: number
) => {
  const result = await instance.get(
    // `/donation?category=${category}&page=${page}&sort=${sort}`
    `/donation?category=COVID19&page=1&sort=recent`
  );
  return result;
};

export const getDonationDetail = async (donation_id: string) => {
  const result = await instance.get(`/donation/${donation_id}`);
  return result;
};
