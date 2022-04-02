import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const HistoryItem = ({ value, onDelete }: any) => {
  const money = Number(value.epilogueBudgetAmount);
  const cmoney = money.toLocaleString();
  return (
    <div className={cx('history-item')}>
      <P>{value.epilogueBudgetPlan}</P>
      <div className={cx('value')}>
        <P>{`${cmoney}KRW`}</P>
        <div className={cx('icon')} onClick={() => onDelete(value.id)}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
