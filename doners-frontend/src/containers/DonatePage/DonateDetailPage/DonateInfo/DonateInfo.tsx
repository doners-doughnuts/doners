import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import HistoryItem from 'components/HistoryItem/HistoryItem';
import { useState } from 'react';
import styles from './DonateInfo.module.scss';

const cx = classNames.bind(styles);

const DonateInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(3.89);
  const [current, setCurrent] = useState(1.0);
  let rate = Math.floor((current / target) * 100);
  const handleClick = (): void => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={cx('info-form')}>
      <div className={cx('title')}>
        <H3>모금 상세 정보</H3>
      </div>
      <div className={cx('date-wrap')}>
        <div className={cx('date-row')}>
          <div className={cx('date-title')}>
            <H4>신청일: </H4>
          </div>
          <H4>2022.03.22</H4>
        </div>
        <div className={cx('date-row')}>
          <div className={cx('date-title')}>
            <H4>마감일: </H4>
          </div>
          <H4>2022.04.08</H4>
          <H4 color="red">(D-23)</H4>
        </div>
        <div className={cx('value-row')}>
          <div className={cx('value-title')}>
            <H4>목표금액: </H4>
          </div>
          <H2>{String(target)}</H2>
          <H4>SSF</H4>
        </div>
      </div>
      <div className={cx('progress-info')}>
        <Progressbar value={rate} />
        <div className={cx('progress-rate')}>
          <Span color="gray">모금액 달성률 : </Span>
          <P color="green">{String(rate).concat('%')}</P>
        </div>
      </div>
      <div>
        <div className={cx('donate-title')}>
          <H3>모금액 활용계획</H3>
        </div>
        <div className={cx('donate-plan')}>
          <div className={cx('detail-plan')}>
            <H4>모금 상세 계획</H4>
            <div className={cx('ocBtn')} onClick={handleClick}>
              <H4 color="green">{isOpen ? '닫기' : '펼치기'}</H4>
            </div>
          </div>
          {isOpen ? (
            <div className={cx('history-items')}>
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DonateInfo;
