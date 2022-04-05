import { useEffect, useState } from 'react';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H2 from 'assets/theme/Typography/H2/H2';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './FundingItem.module.scss';
import Tag from 'assets/theme/Tag/Tag';
import Button from 'assets/theme/Button/Button';
import FundModal from 'containers/ProfilePage/FundModal/FundModal';
import {
  ApplicationProfileListType,
  CategoryCode,
  ApplicationStatusCode,
} from 'types/ApplicationTypes';
import { getDonationDetail } from 'services/api/Donation';
import { DontationDetailType } from 'types/DonationTypes';
import H5 from 'assets/theme/Typography/H5/H5';
import { nowBalance } from 'services/blockchain/SsfApi';
import { calcDday, checkClosedDonation } from 'utils/formatTime';

const cx = classNames.bind(styles);

type FundingItemProps = {
  item: ApplicationProfileListType;
};

const FundingItem = ({ item }: FundingItemProps) => {
  const [target, setTarget] = useState(item.targetAmount);
  const [current, setCurrent] = useState(99999);
  const [modalOpen, setModalOpen] = useState(false);

  //// const [applicationDetail, setApplicationDetail] =
  ////   useState<DontationDetailType>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // TODO 백엔드에 api에 추가적으로 데이터 요청 (임시로 개별적으로 불러오는중)
  // const getApplicationDetail = async () => {
  //   const response = await getDonationDetail(item.donationId);
  //   console.log(response.data);
  //   setApplicationDetail(response.data);
  // };

  /* 모금 달성률 */
  const calcAchievementRate = async () => {
    // let rate = Math.floor((current / target) * 100);
    const currentBalance = await nowBalance(item.contractAddress);
    console.log(currentBalance);
    setCurrent(currentBalance);
  };

  /* 디데이 */
  //* utils/formatTime.ts 로 분리해둠
  // const calcDday = () => {
  //   const dday = Math.ceil(
  //     (Date.now() - new Date(item.endDate).getTime()) / (1000 * 3600 * 24) - 1
  //   );
  //   if (dday === 0) {
  //     setDday('(마감일)');
  //   } else {
  //     const label = dday > 0 ? '+' : '';
  //     setDday('(D' + label + dday + ')');
  //   }
  // };

  useEffect(() => {
    //// getApplicationDetail();
    calcAchievementRate();
    // calcDday();
  }, []);

  return (
    <div>
      <div className={cx('history-item')}>
        <div className={cx('image')}>
          <div className={cx('card')}>
            <div className={cx('tag')}>
              <Tag color="black">{CategoryCode[item.donationCategoryCode]}</Tag>
            </div>
            <div className={cx('img-wrap')}>
              <img src={item.thumbnailImage} alt="" />
            </div>
          </div>
        </div>
        <div className={cx('item-info-wrap')}>
          {item.donationIsApproved ? (
            !checkClosedDonation(item.endDate) ? (
              item.donationIsReceived ? (
                <Tag color="black">기부금 수령 완료</Tag>
              ) : (
                <div
                  className={cx('withdraw-button-wrapper')}
                  onClick={openModal}
                >
                  <Tag color="black">모금 완료</Tag>
                  <Button color={'secondary'} onClick={openModal}>
                    기부금 수령하기
                  </Button>
                </div>
              )
            ) : (
              <Tag color="green">모금 진행중</Tag>
            )
          ) : item.donationApprovalStatusCode !== 'BEFORE_CONFIRMATION' ? (
            <Tag color="yellow">관리자 승인대기</Tag>
          ) : (
            <Tag color="orange">
              {`반려처리: ${
                ApplicationStatusCode[item.donationApprovalStatusCode]
              }`}
            </Tag>
          )}
          {/* <Button color={'primary'} onClick={openModal}>
            수령하기
          </Button> */}
          <FundModal
            open={modalOpen}
            close={closeModal}
            contractAddress={item.contractAddress}
          />
          <div className={cx('date-row')}>
            <div
              className={cx('date-title', 'date-start-title')}
            >{`신청일: ${item.donationStartDate}`}</div>
          </div>
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              {`마감일: ${item.endDate}  `}
              {/* <span className={cx('date-dday')}>{`(D${Math.floor(
                (Date.now() - new Date(item.endDate).getTime()) /
                  (1000 * 3600 * 24)
              )} )`}</span> */}
              <span className={cx('date-dday')}>{calcDday(item.endDate)}</span>
            </div>
          </div>
          <div className={cx('title')}>{item.donationTitle}</div>
          <div className={cx('value-row')}>
            <div className={cx('value-title')}>목표금액:</div>
            <H2>{String(item.targetAmount)}</H2>
            <H4>SSF</H4>
          </div>
          <Progressbar value={Math.floor((current / target) * 100)} />
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <Span color="gray">모금액 달성률 : </Span>{' '}
              <Span color="green">
                {String(Math.floor((current / target) * 100)).concat('%')}
              </Span>
              <Span color="gray">{`  (${current} SSF)`}</Span>{' '}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FundingItem;
