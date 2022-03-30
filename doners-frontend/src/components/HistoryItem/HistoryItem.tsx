import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const HistoryItem = ({ value }: any) => {
  const money = Number(value.epilogueBudgetAmount);
  const cmoney = money.toLocaleString();
  console.log(cmoney);
  return (
    <div className={cx('history-item')}>
      <P>{value.epilogueBudgetPlan}</P>
      <div className={cx('value')}>
        <P>{`${cmoney}KRW`}</P>
        <div className={cx('icon')}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;