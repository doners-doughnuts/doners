import Selectbox, { selectBoxType } from 'assets/theme/Selectbox/Selectbox';
import classNames from 'classnames/bind';
import { env } from 'process';
import { useEffect, useState } from 'react';
import { approveApplication, getDonationDetail } from 'services/api/Donation';
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
  { value: '0', label: RejectionCode.BEFORE_CONFIRMATION },
  { value: '1', label: RejectionCode.APPROVAL },
  { value: '2', label: RejectionCode.WRONG_CONTACT_NUM },
  { value: '3', label: RejectionCode.UNQUALIFIED_DEPUTY },
  { value: '4', label: RejectionCode.DUPLICATION },
  { value: '5', label: RejectionCode.INADEQUATE_PLANNING },
  { value: '6', label: RejectionCode.INSUFFICIENT_REASON },
  { value: '7', label: RejectionCode.LACK_OF_EVIDENCE },
  { value: '8', label: RejectionCode.ETC },
];

type ApprovalModalType = {
  open: boolean;
  onClose: any;
  donation: DonationListType;
  // contents: any;
};

const ApprovalModal = ({ open, onClose, donation }: ApprovalModalType) => {
  const [approvalStatus, setApprovalStatus] = useState('');

  useEffect(() => {
    // TODO
  }, []);

  const handleApprove = async () => {
    // 스마트 컨트랙트에 올릴 기부 상세 정보 받아오기
    const donationDetail: DontationDetailType = await getDonationDetail(
      donation.donationId
    );

    const response = await createFundraiser(
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

    console.log(response);

    // if (response) {
    //   const res = await approveApplication(
    //     contents.donationId,
    //     approvalStatusCode === ''
    //   );
    // }
  };

  console.log(options);
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
            <Selectbox options={options} />
          </div>
          <button onClick={handleApprove}>승인</button>
          <button>거절</button>
        </section>
      ) : null}
    </div>
  );
};

export default ApprovalModal;
