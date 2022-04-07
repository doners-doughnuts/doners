import instance from 'services/axios';

type donationType = {
  category: string;
  page: string;
  sort: string;
  view?: boolean;
};

const COMMON = '/donation';

/**
 * 유저 기부 신청
 * @param formData
 */
export const postDonation = async (formData: any) => {
  const result = await instance.post(`/donation`, formData);
  return result;
};

/**
 * 유저 기부 신청 가능 여부 확인
 */
export const checkUserFundState = async () => {
  const result = await instance.get(COMMON + `/check`);
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
  const result = await instance.get(
    `/donation?category=${category}&page=${page}&sort=${sort}&view=${view}`
  );
  return result;
};

export const getDonationDetail = async (donation_id: string) => {
  const result = await instance.get(`/donation/${donation_id}`);
  // const result: DontationDetailType = _donationDetail;
  return result;
};

export const getSearchDonation = async (
  category: string,
  keyword: string,
  page: number,
  type: string = 't'
) => {
  const result = await instance.get(
    `/donation/search?category=${category}&page=${page}&keyword=${keyword}&type=${type}`
  );
  return result;
};

export const checkApporveDonation = async () => {
  const result = await instance.get(`/donation/check/approve`);
  return result;
};

export const deleteClosedDonation = async (donationId: string) => {
  const result = await instance.patch(`/donation/receive`, { donationId });
  return result;
};

/**
 * 기부 신청 승인
 * @param donationId
 * @param contractAddress
 */
export const approveApplication = async (
  donationId: string,
  contractAddress: string
) => {
  const response = await instance.patch(COMMON + '/approve', {
    donationId,
    approved: true,
    contractAddress,
  });
  return response;
};

/**
 * 기부 신청 반려
 * @param donationId
 * @param approved
 * @param rejectionCode
 */
export const declineApplication = async (
  donationId: string,
  rejectionCode: string
) => {
  const response = await instance.patch(COMMON + '/approve', {
    donationId,
    approved: false,
    rejectionCode,
  });
  return response;
};
