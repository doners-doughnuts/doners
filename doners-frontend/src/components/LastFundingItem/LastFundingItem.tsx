import Progressbar from 'assets/theme/Progressbar/Progressbar';
import Tag from 'assets/theme/Tag/Tag';
import H2 from 'assets/theme/Typography/H2/H2';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { nowBalance } from 'services/blockchain/SsfApi';
import {
  ApplicationProfileListType,
  ApplicationStatusCode,
  CategoryCode,
} from 'types/ApplicationTypes';
import { calcDday, checkClosedDonation } from 'utils/formatTime';
import styles from './LastFundingItem.module.scss';
const cx = classNames.bind(styles);

type LastFundingItemProps = {
  item: ApplicationProfileListType;
};

const LastFundingItem = ({ item }: LastFundingItemProps) => {
  const [target, setTarget] = useState(item.targetAmount);
  const [current, setCurrent] = useState(99999);
  let rate = Math.floor((current / target) * 100);
  // console.log(item);

  /* 모금 달성률 */
  const calcAchievementRate = async () => {
    // let rate = Math.floor((current / target) * 100);
    const currentBalance = await nowBalance(item.contractAddress);
    // console.log(currentBalance);
    setCurrent(currentBalance);
  };

  useEffect(() => {
    //// getApplicationDetail();
    if (item.donationIsApproved) {
      calcAchievementRate();
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
            <div className={cx('img-wrap')}>
              <img src={item.thumbnailImage} alt="" />
            </div>
          </div>
        </div>
        <div className={cx('img-wrap')}></div>
        <div className={cx('item-info-wrap')}>
          {item.donationIsApproved ? (
            // item.donationIsReceived ? (
            <Tag color="black">기부금 수령 완료</Tag>
          ) : (
            // ) : (
            //   <Tag color="black">모금 완료</Tag>
            // )
            // ) : (
            //   <Tag color="green">모금 진행중</Tag>
            // )
            // item.donationApprovalStatusCode === 'BEFORE_CONFIRMATION' ? (
            //   <Tag color="yellow">관리자 승인대기</Tag>
            // ) :
            <Tag color="orange">
              {`반려처리: ${
                ApplicationStatusCode[item.donationApprovalStatusCode]
              }`}
            </Tag>
          )}
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
            <div className={cx('value-title')}>최종 모금액:</div>
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

export default LastFundingItem;
