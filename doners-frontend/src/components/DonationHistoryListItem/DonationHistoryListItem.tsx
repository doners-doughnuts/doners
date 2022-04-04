import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './DonationHistoryListItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';
import { fDate, fDateTime } from 'utils/formatTime';
import { DonationTransactionDetailType } from 'types/TransactionTypes';
import { ReactComponent as DollarIcon } from 'assets/images/icon/dollar.svg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// TODO 'item' type 정의
const DonationHistoryListItem = ({
  account,
  date,
  value,
  donationTitle,
  donationUrl,
}: DonationTransactionDetailType) => {
  // console.log(fDateTime(new Date(date).toDateString()));

  return (
    <div className={cx('history-item')}>
      <div className={cx('card')}>
        <div className={cx('date')}>
          {/* {fDateTime(new Date(date).toISOString())} */}
          2022/04/01 12:32PM
        </div>
        <div className={cx('title')}>{donationTitle}</div>
        <div className={cx('ls')}>
          <div className={cx('icon')}>
            <DollarIcon />
          </div>
          <div className={cx('money')}>{`${value} SSF`}</div>
          <div className={cx('parti')}>{account}</div>
          {/* <div className={cx('parti')}>기부참여</div> */}
          <div onClick={() => console.log('TODO')} className={cx('open-btn')}>
            {/* <P color="green">기부글 상세보기</P> */}
            {/* <Link to={`/fundraisings/${donationId}`} className={cx('open-btn')}>
              기부글 상세보기
            </Link> */}
            <a href={donationUrl} className={cx('open-btn')}>
              기부글 상세보기
            </a>
            {/* <Link to={} className={cx('open-btn')}>
              
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistoryListItem;
