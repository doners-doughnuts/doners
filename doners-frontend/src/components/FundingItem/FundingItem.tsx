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
} from 'types/ApplicationTypes';
import { getDonationDetail } from 'services/api/Donation';
import { DontationDetailType } from 'types/DonationTypes';
import H5 from 'assets/theme/Typography/H5/H5';

const cx = classNames.bind(styles);

type FundingItemProps = {
  item: ApplicationProfileListType;
};

const FundingItem = ({ item }: FundingItemProps) => {
  // const [target, setTarget] = useState(3.89);
  // const [current, setCurrent] = useState(1.0);
  const [modalOpen, setModalOpen] = useState(false);

  const [applicationDetail, setApplicationDetail] =
    useState<DontationDetailType>();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // let rate = Math.floor((current / target) * 100);

  // TODO 백엔드에 api에 추가적으로 데이터 요청 (임시로 개별적으로 불러오는중)
  const getApplicationDetail = async () => {
    const response = await getDonationDetail(item.donationId);
    console.log(response.data);
    setApplicationDetail(response.data);
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  return (
    <div>
      {applicationDetail ? (
        <div className={cx('history-item')}>
          <div className={cx('image')}>
            <div className={cx('card')}>
              <div className={cx('tag')}>
                <Tag color="black">
                  {CategoryCode[item.donationCategoryCode]}
                </Tag>
              </div>
              <div className={cx('img-wrap')}>
                <img src={applicationDetail.image} alt="" />
              </div>
            </div>
          </div>
          <div className={cx('date-wrap')}>
            {item.donationIsApproved ? (
              // <Tag color="green">{item.donationIsReceived ? '수령완료': '수령가능'}모금 진행중</Tag>
              <Tag color="green">모금 진행중</Tag>
            ) : item.donationApprovalStatusCode === 'BEFORE_CONFIRMATION' ? (
              <Tag color="red">관리자 승인대기</Tag>
            ) : item.donationApprovalStatusCode === 'BEFORE_CONFIRMATION' ? (
              <>
                <Tag color="black">반려처리</Tag>
                <Tag color="black">사유: {}</Tag>
              </>
            ) : null}
            <Button color={'primary'} onClick={openModal}>
              수령하기
            </Button>
            <FundModal open={modalOpen} close={closeModal} />
            <div className={cx('date-row')}>
              <div
                className={cx('date-title')}
              >{`신청일: ${item.donationStartDate}`}</div>
            </div>
            <div className={cx('date-row')}>
              <div className={cx('date-title')}>
                {`마감일: ${applicationDetail.endDate}`}
                <span className={cx('date-dday')}>(D-23)</span>
              </div>
            </div>
            <div className={cx('title')}>{item.donationTitle}</div>
            <div className={cx('value-row')}>
              <div className={cx('value-title')}>목표금액:</div>
              <H2>{String(applicationDetail.targetAmount)}</H2>
              <H4>SSF</H4>
            </div>
            <Progressbar value={applicationDetail.achievementRate} />
            <div className={cx('date-row')}>
              <div className={cx('date-title')}>
                <Span color="gray">모금액 달성률 : </Span>{' '}
                <Span color="green">
                  {String(applicationDetail.achievementRate).concat('%')}
                </Span>
                <Span color="gray"> (0.010212 SSF)</Span>{' '}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default FundingItem;
