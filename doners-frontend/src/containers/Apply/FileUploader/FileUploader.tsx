import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';

import classNames from 'classnames/bind';
import styles from './FileUploader.module.scss';
import UploadItem from 'components/UploadItem/UploadItem';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

type historyType = {
  epilogueBudgetPlan: string;
  epilogueBudgetAmount: string;
};

const FileUploader = ({ onChange }: any) => {
  const [historyList, setHistoryList] = useState<historyType[]>([]);
  const [history, setHistory] = useState('');
  const [money, setMoney] = useState('');

  const handleOnclick = () => {
    if (history) {
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

  return (
    <div className={cx('receipt-editor')}>
      <div className={cx('input-form')}>
        <div className={cx('input-history')}>
          <Input
            type="file"
            onChange={(ev) => setHistory(ev.target.value)}
            value={history}
          />
        </div>
        <div className={cx('add-btn')}>
          <Button color="alternate" fullWidth onClick={handleOnclick}>
            추가
          </Button>
        </div>
      </div>
      <div className={cx('history-list')}>
        {historyList.map((data, idx) => {
          return <UploadItem value={data} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default FileUploader;
