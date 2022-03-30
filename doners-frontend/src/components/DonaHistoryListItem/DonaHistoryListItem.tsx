import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './DonaHistoryListItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const DonaHistoryListItem = () => {
  return (
    <div className={cx('history-item')}>
      <div className={cx('card')}>
        <div className={cx('date')}>2022.10.22</div>
        <div className={cx('title')}>참전용사입니다. 지원을 바랍니다.</div>
        <div className={cx('ls')}>
          <div className={cx('money')}>0.01525443 ETH</div>
          <div className={cx('parti')}>기부참여</div>
        </div>
      </div>
    </div>
  );
};

export default DonaHistoryListItem;
