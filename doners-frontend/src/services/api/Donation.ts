import instance from 'services/axios';
import { DontationDetailType } from 'types/DonationTypes';
import _donationDetail from '_mocks_/donationDetail';

type donationType = {
  category: string;
  page: string;
  sort: string;
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
  console.log(result);
  return result;
};

export const getDonationList = async (
  category: string,
  sort: string,
  page: number
) => {
  const result = await instance.get(
    `/donation?category=${category}&page=${page}&sort=${sort}`
    // `/donation?category=COVID19&page=1&sort=recent`
  );
  return result;
};

export const getDonationDetail = async (donation_id: string) => {
  // const result: DontationDetailType = await instance.get(
  //   `/donation/${donation_id}`
  // );
  const result: DontationDetailType = _donationDetail;
  return result;
};

/**
 * 기부 신청 승인
 * @param donationId
 * @param approved
 * @param rejectionCode
 */
export const approveApplication = async (donationId: string) => {
  const response = await instance.patch(COMMON + '/approve', {
    donationId,
    approved: true,
  });
  console.log(response);
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
  });
  console.log(response);
};
