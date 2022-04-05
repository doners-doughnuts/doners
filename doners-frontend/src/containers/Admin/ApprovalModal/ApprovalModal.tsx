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
import {
  DonationListType,
  DontationDetailType,
  EvidenceType,
} from 'types/DonationTypes';
import { getWalletAccount } from 'utils/walletAddress';
import { ReactComponent as CloseIcon } from 'assets/images/icon/close.svg';

import styles from './ApprovalModal.module.scss';
import H4 from 'assets/theme/Typography/H4/H4';
import { toast } from 'react-toastify';
import { IFileTypes } from 'containers/Apply/ApplyReasonForm/ApplyReasonForm';
import { useCallback } from 'react';
import { ChangeEvent } from 'react';
import { useRef } from 'react';
import FileButton from 'assets/theme/Button/FileButton/FileButton';
import UserInfo from 'containers/DonatePage/DonateDetailPage/UserInfo/UserInfo';
import DonateContent from 'containers/DonatePage/DonateDetailPage/DonateContent/DonateContent';
import DonateInfo from 'containers/DonatePage/DonateDetailPage/DonateInfo/DonateInfo';
import H3 from 'assets/theme/Typography/H3/H3';

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
  // { value: 'BEFORE_CONFIRMATION', label: RejectionCode.BEFORE_CONFIRMATION },
  // { value: 'APPROVAL', label: RejectionCode.APPROVAL },
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
  setStatus: any;
  donation: DonationListType;
  // contents: any;
};

const ApprovalModal = ({
  open,
  onClose,
  setStatus,
  donation,
}: ApprovalModalType) => {
  const [approvalStatus, setApprovalStatus] = useState('');
  const [donationDetail, setDonationDetail] = useState({
    achievementRate: 0,
    account: '',
    approvalStatusCode: '',
    beneficiaryName: '',
    budget: [],
    categoryCode: '',
    deputy: false,
    description: '',
    donors: [],
    email: '',
    endDate: '',
    evidence: [],
    exist: false,
    image: '',
    name: '',
    phone: '',
    recommendations: 0,
    startDate: '',
    targetAmount: 0,
    title: '',
    views: 0,
    nickname: '',
    contractAddress: '',
  });
  const [files, setFiles] = useState<EvidenceType[]>([]);

  const getDonationDetailInfo = async () => {
    const response = await getDonationDetail(donation.donationId);
    // const donationDetail: DontationDetailType = response.data;

    console.log(donationDetail);
    setFiles(response.data.evidence);
    setDonationDetail(response.data);
  };

  useEffect(() => {
    if (open) getDonationDetailInfo();
  }, [open]);

  // useEffect(() => {}, [files]);

  const handleApprove = async () => {
    // 스마트 컨트랙트에 올릴 기부 상세 정보 받아오기

    //** 송민수 수정 : await getDonationDetail을 하면 바로 data를 가져오는게 아니라 response.data에 값이 들어가 있음.
    //               따라서 const donationDetail에서 바로 요소 추출 불가능  */
    ///// const donationDetail: DontationDetailType = await getDonationDetail(
    //// const response = await getDonationDetail(donation.donationId);
    //// const donationDetail = response.data;

    // contract address가 반환된다
    // ex. 0xc86F168f8D5b22C677c0184C2865C11Dc5921951
    if (donationDetail) {
      const fundContractAddress: string = await createFundraiser(
        process.env.REACT_APP_DONATIONFACTORY_CONTRACT_ADDRESS!,
        await getWalletAccount(),
        donationDetail.title,
        //// process.env.REACT_APP_BASE_URL + '/fundraisers/' + donation.donationId,
        //* url 대신 donationId로 변경
        donation.donationId,
        donationDetail.image,
        donationDetail.description,
        donationDetail.targetAmount,
        new Date(donationDetail.endDate).getTime(),
        donationDetail.account
      );

      console.log(fundContractAddress);

      if (fundContractAddress.includes('0x')) {
        const response = await approveApplication(
          donation.donationId,
          fundContractAddress
        );
        console.log(response);
        if (response.status === 200) {
          toast.success('기부 신청이 승인처리 되었습니다.');
          setStatus(true);
          onClose();
          // TODO 승인 실패 처리
        } else {
          toast.error(
            '신청 승인 처리에 실패하였습니다. 잠시 후 다시 시도해주세요.'
          );
          setStatus(false);
        }
      }
    }
  };

  const handleDecline = async () => {
    const response = await declineApplication(
      donation.donationId,
      approvalStatus
    );
    // console.log(response);
    if (response.status === 200) {
      toast.success('기부 신청이 거절처리 되었습니다.');
      setStatus(false);
      onClose();
    } else {
      // TODO 승인거절 실패 처리
      toast.error(
        '신청 거부 처리에 실패하였습니다. 잠시 후 다시 시도해주세요.'
      );
      setStatus(false);
    }
  };

  return (
    <div className={cx('modal', { openModal: open === true })}>
      {open ? (
        <section className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-12', 'col-md-12', 'col-sm-4')}>
              <div className={cx('header')}>
                <H3>기부신청 내역 처리</H3>
                <div className={cx('close-btn')} onClick={() => onClose()}>
                  <CloseIcon />
                </div>
              </div>
            </div>
            {/* <div className={cx('col-lg-6', 'col-md-6', 'col-sm-4')}></div> */}
            <div className={cx('col-lg-5', 'col-md-6', 'col-sm-4', 'userInfo')}>
              <UserInfo data={donationDetail} />
            </div>
            <div
              className={cx(
                'col-lg-6',
                'col-md-6',
                'col-sm-4',
                'donateContent'
              )}
            >
              <DonateContent data={donationDetail} />
            </div>
            <div className={cx('col-lg-5', 'donationDetail')}>
              <DonateInfo data={donationDetail} />
            </div>
            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-4')}>
              <div className={cx('file')}>
                <H3>증빙자료</H3>
                <div className={cx('fileuploadlist')}>
                  {files.length > 0 &&
                    files.map((file: EvidenceType) => (
                      <FileButton
                        key={file.url}
                        name={file.name}
                        url={file.url}
                      />
                    ))}
                </div>
                <div className={cx('select-box')}>
                  <b>기부 신청 반려사유 선택</b>
                  <Selectbox
                    onChange={(e) => setApprovalStatus(e.value)}
                    options={options}
                  />
                </div>
                <div className={cx('button-group')}>
                  <div className={cx('button')}>
                    <Button
                      color="secondary"
                      fullWidth
                      onClick={handleApprove}
                      disabled={
                        donationDetail?.approvalStatusCode === 'APPROVAL'
                      }
                    >
                      승인
                    </Button>
                  </div>
                  <div className={cx('button')}>
                    <Button
                      color="alternate"
                      fullWidth
                      onClick={handleDecline}
                      disabled={
                        donationDetail?.approvalStatusCode !==
                        'BEFORE_CONFIRMATION'
                      }
                    >
                      거절
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ApprovalModal;
