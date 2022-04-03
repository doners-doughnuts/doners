import Button from 'assets/theme/Button/Button';
import Selectbox from 'assets/theme/Selectbox/Selectbox';
import classNames from 'classnames/bind';
import { env } from 'process';
import { useEffect, useState } from 'react';
import {
  getDonationDetail,
  approveApplication,
  declineApplication,
} from 'services/api/Donation';
import { createFundraiser } from 'services/blockchain/SsfApi';
import { DonationListType, DontationDetailType } from 'types/DonationTypes';
import { getWalletAccount } from 'utils/walletAddress';
import styles from './ApprovalModal.module.scss';

const cx = classNames.bind(styles);

export enum RejectionCode {
  BEFORE_CONFIRMATION = '확인 전',
  APPROVAL = '승인',
  WRONG_CONTACT_NUM = '신청자 연락처 확인 불가',
  UNQUALIFIED_DEPUTY = '대리인 자격 부족',
  DUPLICATION = '기존 기부 내역과 중복',
  INADEQUATE_PLANNING = '모금 상세 계획 미흡',
  INSUFFICIENT_REASON = '모금 사유 불충분',
  LACK_OF_EVIDENCE = '증빙자료 부족',
  ETC = '기타',
}

// const [options, setOptions] = useState<selectBoxType>({ options: [] });
// Object.values(RejectionCode).forEach((value, idx) => {
//   options.options.push({ value: idx.toString(), label: value })
// })
// setOptions(options);

/* 관리자 기부신청 처리 관련 반려 사유 */
const options = [
  { value: 'BEFORE_CONFIRMATION', label: RejectionCode.BEFORE_CONFIRMATION },
  { value: 'APPROVAL', label: RejectionCode.APPROVAL },
  { value: 'WRONG_CONTACT_NUM', label: RejectionCode.WRONG_CONTACT_NUM },
  { value: 'UNQUALIFIED_DEPUTY', label: RejectionCode.UNQUALIFIED_DEPUTY },
  { value: 'DUPLICATION', label: RejectionCode.DUPLICATION },
  { value: 'INADEQUATE_PLANNING', label: RejectionCode.INADEQUATE_PLANNING },
  { value: 'INSUFFICIENT_REASON', label: RejectionCode.INSUFFICIENT_REASON },
  { value: 'LACK_OF_EVIDENCE', label: RejectionCode.LACK_OF_EVIDENCE },
  { value: 'ETC', label: RejectionCode.ETC },
];

type ApprovalModalType = {
  open: boolean;
  onClose: any;
  donation: DonationListType;
  // contents: any;
};

const ApprovalModal = ({ open, onClose, donation }: ApprovalModalType) => {
  const [approvalStatus, setApprovalStatus] = useState('');
  // console.log(approvalStatus);
  useEffect(() => {
    // TODO
  }, []);

  const handleApprove = async () => {
    // 스마트 컨트랙트에 올릴 기부 상세 정보 받아오기

    //** 송민수 수정 : await getDonationDetail을 하면 바로 data를 가져오는게 아니라 response.data에 값이 들어가 있음.
    //               따라서 const donationDetail에서 바로 요소 추출 불가능  */
    // const donationDetail: DontationDetailType = await getDonationDetail(
    const response = await getDonationDetail(donation.donationId);
    const donationDetail = response.data;

    // contract address가 반환된다
    // ex. 0xc86F168f8D5b22C677c0184C2865C11Dc5921951
    const fundContractAddress: string = await createFundraiser(
      process.env.REACT_APP_DONATIONFACTORY_CONTRACT_ADDRESS!,
      await getWalletAccount(),
      donationDetail.title,
      process.env.REACT_APP_BASE_URL + '/fundraiser/' + donation.donationId,
      donationDetail.image,
      donationDetail.description,
      donationDetail.targetAmount,
      new Date(donationDetail.endDate).getTime(),
      donationDetail.account
    );

    console.log(fundContractAddress);

    if (fundContractAddress.includes('0x')) {
      const response = await approveApplication(donation.donationId);
      console.log(response);
    }
  };

  const handleDecline = async () => {
    const response = await declineApplication(
      donation.donationId,
      approvalStatus
    );
    console.log(response);
  };

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        <section className={cx('inner-container')}>
          <div className={cx('p')}>
            모달
            <Selectbox
              onChange={(e) => setApprovalStatus(e.value)}
              options={options}
            />
          </div>
          <Button color="secondary" fullWidth onClick={handleApprove}>
            승인
          </Button>
          <Button color="alternate" fullWidth onClick={handleDecline}>
            거절
          </Button>
        </section>
      ) : null}
    </div>
  );
};

export default ApprovalModal;
