import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const HistoryItem = () => {
  return (
    <div className={cx('history-item')}>
      <P>(활용 내역1)</P>
      <div className={cx('value')}>
        <P>120,000 KRW</P>
        <div className={cx('icon')}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
