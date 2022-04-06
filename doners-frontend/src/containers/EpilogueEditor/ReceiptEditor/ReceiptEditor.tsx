import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import P from 'assets/theme/Typography/P/P';

import classNames from 'classnames/bind';
import styles from './ReceiptEditor.module.scss';
import HistoryItem from 'components/HistoryItem/HistoryItem';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

type historyType = {
  epilogueBudgetSequence: number;
  epilogueBudgetPlan: string;
  epilogueBudgetAmount: string;
};

const ReceiptEditor = ({ onDelete, onChange, list, length }: any) => {
  const [historyList, setHistoryList] = useState<historyType[]>([]);
  const [history, setHistory] = useState('');
  const [money, setMoney] = useState('');
  const [initlength, setLength] = useState(0);

  useEffect(() => {
    if (!list) {
      list.map((data: historyType, idx: number) => {
        data.epilogueBudgetSequence = idx;
        return data;
      });
      setHistoryList(list);
    }
  }, [list]);

  useEffect(() => {
    setLength(historyList.length);
  }, [historyList]);

  const handleOnclick = () => {
    if (history && money) {
      setHistoryList((prev) => [
        ...prev,
        {
          epilogueBudgetSequence: initlength,
          epilogueBudgetPlan: history,
          epilogueBudgetAmount: money,
        },
      ]);

      onChange({
        epilogueBudgetSequence: initlength,
        epilogueBudgetPlan: history,
        epilogueBudgetAmount: money,
      });
      setLength((prev) => prev + 1);

      setHistory('');
      setMoney('');
    }
  };

  const total = historyList
    .map((item) => Number(item.epilogueBudgetAmount))
    .reduce((prev, curr) => prev + curr, 0);

  const handleHistoryDelete = (epilogueBudgetSequence: number): void => {
    // console.log(epilogueBudgetSequence);
    setHistoryList(
      historyList.filter(
        (history) => history.epilogueBudgetSequence !== epilogueBudgetSequence
      )
    );
    onDelete(epilogueBudgetSequence);
  };

  return (
    <div className={cx('receipt-editor')}>
      <div className={cx('input-form')}>
        <div className={cx('input-history')}>
          <Input
            placeholder="활용 내역"
            onChange={(ev) => setHistory(ev.target.value)}
            value={history}
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
          // console.log(data);
          return (
            <HistoryItem
              value={data}
              key={idx}
              onDelete={handleHistoryDelete}
            />
          );
        })}
      </div>
      <div className={cx('total-use-value')}>
        <P>{`총 사용 모금액: ${total} KRW`}</P>
      </div>
    </div>
  );
};

export default ReceiptEditor;
