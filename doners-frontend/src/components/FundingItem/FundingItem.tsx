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
import { fundraiserIsWithdraw, nowBalance } from 'services/blockchain/SsfApi';
import { calcDday, checkClosedDonation } from 'utils/formatTime';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

type FundingItemProps = {
  item: ApplicationProfileListType;
};

const FundingItem = ({ item }: FundingItemProps) => {
  const [target, setTarget] = useState(item.targetAmount);
  // 관리자 승인이 된 모금이라면, 애니메이션 효과를 위해 99999로 설정
  const [current, setCurrent] = useState(item.donationIsApproved ? 999999 : 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [collectedBalance, setCollectedBalance] = useState(0);

  //// const [applicationDetail, setApplicationDetail] =
  ////   useState<DontationDetailType>();

  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    checkWithdrawState();
    setModalOpen(false);
  };

  // (완료) 백엔드에 api에 추가적으로 데이터 요청 (임시로 개별적으로 불러오는중)
  // const getApplicationDetail = async () => {
  //   const response = await getDonationDetail(item.donationId);
  //   console.log(response.data);
  //   setApplicationDetail(response.data);
  // };

  /* 기부글 상세로 이동 */
  const handleThumbnailClick = () => {
    navigate('/fundraisings/' + item.donationId);
  };

  /* 기부금 수령 여부 */
  /* 최종 모금 달성률 */
  const checkWithdrawState = async () => {
    // (완료) 모금액 수령이 완료되었는지 검사
    const response = await fundraiserIsWithdraw(item.contractAddress);
    console.log('모금액 수령 여부: ', response);
    setIsWithdrawn(response.isWithdraw);
    setCollectedBalance(response.targetMoney);
  };

  /* 현재 모금 달성률 */
  const calcCurrentAchievementRate = async () => {
    // let rate = Math.floor((current / target) * 100);
    const currentBalance = await nowBalance(item.contractAddress);
    // console.log(currentBalance);
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

  // console.log(checkClosedDonation(item.endDate));

  useEffect(() => {
    //// getApplicationDetail();
    //* 관리자 승인 전이면 contractAddress가 아직 존재하지 않음
    if (item.donationIsApproved) {
      calcCurrentAchievementRate();
      checkWithdrawState();
    }
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
            <div className={cx('img-wrap')} onClick={handleThumbnailClick}>
              <img src={item.thumbnailImage} alt="" />
            </div>
          </div>
        </div>
        <div className={cx('item-info-wrap')}>
          {item.donationIsApproved ? (
            checkClosedDonation(item.endDate) ? (
              isWithdrawn ? (
                <Tag color="black">기부금 수령 완료</Tag>
              ) : (
                <div
                  className={cx('withdraw-button-wrapper')}
                  // onClick={openModal}
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
          ) : item.donationApprovalStatusCode === 'BEFORE_CONFIRMATION' ? (
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
          {item.donationIsApproved ? (
            <FundModal
              open={modalOpen}
              close={closeModal}
              contractAddress={item.contractAddress}
              targetAmount={item.targetAmount}
            />
          ) : null}

          <div className={cx('date-row')}>
            <div
              className={cx('date-title', 'date-start-title')}
            >{`신청일: ${item.donationStartDate}`}</div>
          </div>
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              {`마감일: ${item.endDate}  `}
              <span className={cx('date-dday')}>{calcDday(item.endDate)}</span>
            </div>
          </div>
          <div className={cx('title')}>{item.donationTitle}</div>
          <div className={cx('value-row')}>
            <div className={cx('value-title')}>목표금액:</div>
            <div className={cx('value-info')}>{String(item.targetAmount)}</div>
            <div className={cx('value-title')}>SSF</div>
          </div>
          <Progressbar value={Math.floor((current / target) * 100)} />
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <Span color="gray">모금액 달성률 : </Span>{' '}
              <Span color="green">
                {checkClosedDonation(item.endDate)
                  ? String(
                      Math.floor((collectedBalance / target) * 100)
                    ).concat('%')
                  : String(Math.floor((current / target) * 100)).concat('%')}
              </Span>
              <Span color="gray">
                {checkClosedDonation(item.endDate)
                  ? `   (${collectedBalance} SSF)`
                  : `  (${current} SSF)`}
              </Span>{' '}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FundingItem;
