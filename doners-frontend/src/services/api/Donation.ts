import { vi } from 'date-fns/locale';
import instance from 'services/axios';
import { DontationDetailType } from 'types/DonationTypes';
import _donationDetail from '_mocks_/donationDetail';

type donationType = {
  category: string;
  page: string;
  sort: string;
  view?: boolean;
};

const COMMON = '/donation';

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
  console.log(category, sort, page, view);
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
