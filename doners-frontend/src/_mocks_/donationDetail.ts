import { DontationDetailType } from 'types/DonationTypes';

const _donationDetail: DontationDetailType = {
  title: '일자리를 잃었습니다',
  categoryCode: 'COVID19',
  views: 234,
  recommendations: 85,
  description:
    '애국가(愛國歌)는 대한민국의 국가이다. 1919년 안창호에 의해 대한민국 임시 정부에서 스코틀랜드 민요인 〈작별〉에 삽입해서 부르기 시작하다가 1935년 한국의 ...',
  image: 'https://picsum.photos/200/300',
  startDate: '2021/09/22',
  endDate: '2022/07/04',
  account: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367',
  targetAmount: 2348,
  budget: [{ plan: '하나', amount: 234.238, sequence: 1 }],
  name: '송민수',
  nickname: 'songeebeosut',
  email: 'dondon@gmail.com',
  phone: '010-7372-9899',
  deputy: false,
  beneficiaryName: '',
  exist: false,
  approvalStatusCode: 'APPROVAL',
  donors: {},
  achievementRate: 89,
  evidence: [
    {
      name: '샘플파일.jjppgg',
      url: 'https://donersa404.s3.ap-northeast-2.amazonaws.com/5f24942c-265c-4096-bbb6-5ce4b553abc1.PNG',
    },
  ],
  contractAddress: '',
};

export default _donationDetail;
