import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';

import classNames from 'classnames/bind';
import styles from './ReceiptEditor.module.scss';
import HistoryItem from 'components/HistoryItem/HistoryItem';

const cx = classNames.bind(styles);

const ReceiptEditor = () => {
  return (
    <div className={cx('receipt-editor')}>
      <div className={cx('input-form')}>
        <div className={cx('input-history')}>
          <Input placeholder="활용 내역" />
        </div>
        <div className={cx('input-value')}>
          <Input placeholder="KRW" />
        </div>
        <div className={cx('add-btn')}>
          <Button color="secondary" fullWidth>
            추가
          </Button>
        </div>
      </div>
      <div className={cx('history-list')}>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </div>
      <div className={cx('total-use-value')}>
        <P>총 사용 모금액: 360,000 KRW</P>
      </div>
    </div>
  );
};

export default ReceiptEditor;
