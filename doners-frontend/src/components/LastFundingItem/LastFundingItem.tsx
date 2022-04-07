import Button from 'assets/theme/Button/Button';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import Tag from 'assets/theme/Tag/Tag';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import FundModal from 'containers/ProfilePage/FundModal/FundModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fundraiserIsWithdraw } from 'services/blockchain/SsfApi';
import {
  ApplicationProfileListType,
  ApplicationStatusCode,
  CategoryCode,
} from 'types/ApplicationTypes';
import { calcDday } from 'utils/formatTime';
import styles from './LastFundingItem.module.scss';
const cx = classNames.bind(styles);

type LastFundingItemProps = {
  item: ApplicationProfileListType;
  isOwner: boolean;
};

const LastFundingItem = ({ item, isOwner }: LastFundingItemProps) => {
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [collectedBalance, setCollectedBalance] = useState(0);

  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    checkWithdrawState();
    setModalOpen(false);
  };

  /* 기부글 상세로 이동 */
  const handleThumbnailClick = () => {
    navigate('/fundraisings/' + item.donationId);
  };

  /* 기부금 수령 여부 */
  /* 최종 모금 달성률 */
  const checkWithdrawState = async () => {
    // (완료) 모금액 수령이 완료되었는지 검사
    const response = await fundraiserIsWithdraw(item.contractAddress);
    console.log('이전 내역 모금액 수령 여부: ', response);
    setIsWithdrawn(response.isWithdraw);
    setCollectedBalance(response.targetMoney);
  };

  useEffect(() => {
    //* 관리자 승인 전이면 contractAddress가 아직 존재하지 않음
    if (item.donationIsApproved) {
      checkWithdrawState();
    }
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
        <div className={cx('img-wrap')}></div>
        <div className={cx('item-info-wrap')}>
          {item.donationIsApproved ? (
            isWithdrawn ? (
              <Tag color="black">기부금 수령 완료</Tag>
            ) : (
              <div className={cx('withdraw-button-wrapper')}>
                <Tag color="black">모금 완료</Tag>
                {isOwner ? (
                  <Button color={'secondary'} onClick={openModal}>
                    기부금 수령하기
                  </Button>
                ) : null}
              </div>
            )
          ) : (
            <Tag color="orange">
              {`반려처리: ${
                ApplicationStatusCode[item.donationApprovalStatusCode]
              }`}
            </Tag>
          )}

          {item.donationIsApproved ? (
            <FundModal
              open={modalOpen}
              close={closeModal}
              contractAddress={item.contractAddress}
              targetAmount={item.targetAmount}
              donationId={item.donationId}
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
            <div className={cx('value-title')}>최종 모금액:</div>
            <div className={cx('value-info')}>{String(collectedBalance)}</div>
            <div className={cx('value-title')}>SSF</div>
          </div>
          <Progressbar
            value={Math.floor((collectedBalance / item.targetAmount) * 100)}
          />
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <Span color="gray">모금액 달성률 : </Span>{' '}
              <Span color="green">
                {String(
                  Math.floor((collectedBalance / item.targetAmount) * 100)
                ).concat('%')}
              </Span>
              <Span color="gray">{`  (${collectedBalance} SSF)`}</Span>{' '}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LastFundingItem;
