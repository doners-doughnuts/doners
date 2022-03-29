import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';

import classNames from 'classnames/bind';
import styles from './ReceiptEditor.module.scss';
import HistoryItem from 'components/HistoryItem/HistoryItem';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

type historyType = {
  epilogueBudgetPlan: string;
  epilogueBudgetAmount: string;
  // id: number;
};

const ReceiptEditor = ({ onChange }: any) => {
  const [historyList, setHistoryList] = useState<historyType[]>([]);
  const [history, setHistory] = useState('');
  const [money, setMoney] = useState('');
  const nextId = 1;

  const handleOnclick = () => {
    if (history && money) {
      const data = {
        epilogueBudgetPlan: history,
        epilogueBudgetAmount: money,
      };
      setHistoryList((prev) => [...prev, data]);
      onChange(data);
      setHistory('');
      setMoney('');
    }
  };

  // const handleOnDelete = () => {};
  const total = historyList
    .map((item) => Number(item.epilogueBudgetAmount))
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className={cx('receipt-editor')}>
      <div className={cx('input-form')}>
        <div className={cx('input-history')}>
          <Input
            placeholder="활용 내역"
            onChange={(ev) => setHistory(ev.target.value)}
            value={history}
            // ref={inputRef}
          />
        </div>
        <div className={cx('input-value')}>
          <Input
            placeholder="KRW"
            onChange={(ev) => setMoney(ev.target.value)}
            value={money}
            type="number"
          />
        </div>
        <div className={cx('add-btn')}>
          <Button color="secondary" fullWidth onClick={handleOnclick}>
            추가
          </Button>
        </div>
      </div>
      <div className={cx('history-list')}>
        {historyList.map((data, idx) => {
          return <HistoryItem value={data} key={idx} />;
        })}
      </div>
      <div className={cx('total-use-value')}>
        <P>{`총 사용 모금액: ${total.toLocaleString()} KRW`}</P>
      </div>
    </div>
  );
};

export default ReceiptEditor;
