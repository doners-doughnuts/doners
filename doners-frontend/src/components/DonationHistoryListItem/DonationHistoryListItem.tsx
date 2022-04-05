import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './DonationHistoryListItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';
import { fDate, fDateTime, fFundraiserContractTime } from 'utils/formatTime';
import { DonationTransactionType } from 'types/TransactionTypes';
import { ReactComponent as DollarIcon } from 'assets/images/icon/dollar.svg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// TODO 'item' type 정의
const DonationHistoryListItem = ({
  fromAccount,
  toAccount,
  date,
  value,
  donationId,
  donationTitle,
}: DonationTransactionType) => {
  // console.log(fDateTime(new Date(date).toDateString()));

  return (
    <div className={cx('history-item')}>
      <div className={cx('card')}>
        <div className={cx('date')}>
          {fFundraiserContractTime(date)}
          {/* {fDateTime(new Date(Number(date) * 1000).toString())} */}
        </div>
        <div className={cx('title')}>{donationTitle}</div>
        <div className={cx('ls')}>
          <div className={cx('icon')}>
            <DollarIcon />
          </div>
          <div className={cx('money')}>{`${value} SSF`}</div>
          <div className={cx('parti')}>{toAccount}</div>
          {/* <div className={cx('parti')}>기부참여</div> */}
          <div onClick={() => console.log('TODO')} className={cx('open-btn')}>
            <Link to={`/fundraisings/${donationId}`} className={cx('open-btn')}>
              기부글 상세보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistoryListItem;
