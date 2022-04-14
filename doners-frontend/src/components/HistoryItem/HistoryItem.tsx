import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const HistoryItem = ({ value, onDelete, viewOnly }: any) => {
  const money = Number(value.epilogueBudgetAmount);
  return (
    <div className={cx('history-item')}>
      <P>{value.epilogueBudgetPlan}</P>
      <div className={cx('value')}>
        <P>{`${money}원`}</P>
        <div
          className={cx('icon')}
          onClick={() => onDelete(value.epilogueBudgetSequence)}
        >
          {!viewOnly ? <RemoveIcon /> : null}
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
