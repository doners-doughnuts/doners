export type ApplicationProfileListType = {
  donationApprovalStatusCode: string;
  donationCategoryCode: string;
  donationId: string;
  donationIsApproved: boolean;
  donationIsReceived: boolean;
  donationStartDate: string;
  donationTitle: string;
};

// TODO 아래의 const들 위치 /types 말고 다른 곳으로 이동 (리팩토링)
export const CategoryCode: Record<string, string> = {
  COVID19: '코로나19',
  WARRIOR: '참전용사',
  PATIENT: '희귀질환',
  SINGLE: '미혼모/부',
};

export const ApplicationStatusCode: Record<string, string> = {
  BEFORE_CONFIRMATION: '확인 전',
  APPROVAL: '승인',
  WRONG_CONTACT_NUM: '신청자 연락처 확인 불가',
  UNQUALIFIED_DEPUTY: '대리인 자격 부족',
  DUPLICATION: '기존 기부 내역과 중복',
  INADEQUATE_PLANNING: '모금 상세 계획 미흡',
  INSUFFICIENT_REASON: '모금 사유 불충분',
  LACK_OF_EVIDENCE: '증빙자료 부족',
  ETC: '기타',
};
