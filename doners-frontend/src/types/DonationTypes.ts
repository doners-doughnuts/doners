export type DonationListType = {
  donationId: string;
  thumbnail: string;
  title: string;
  beneficiaryName: string;
  targetAmount: number;
};

export type DontationDetailType = {
  // donationId: string;
  title: string;
  categoryCode: string;
  views: number;
  recommendations: number;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  account: string;
  targetAmount: number;
  budget: object;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  deputy: boolean;
  beneficiaryName: string;
  exist: boolean;
  approvalStatusCode: string;
  doners: object;
  achievementRate: number;
  // evidence: Record<string, string>;
  evidence: Array<object>;
};
