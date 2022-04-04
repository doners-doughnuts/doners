import H3 from 'assets/theme/Typography/H3/H3';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import styles from './DonateHistory.module.scss';
import { ReactComponent as WaveIcon } from 'assets/images/icon/wave.svg';
import { DontationDetailType } from 'types/DonationTypes';
import { nowFundraiserData } from 'services/blockchain/SsfApi';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
type DonateHistoryProps = {
  data: DontationDetailType;
};
const DonateHistory = ({ data }: DonateHistoryProps) => {
  const [history, setHistory] = useState([]);

  const getDonateHistory = async () => {
    if (data.contractAddress) {
      const result = await nowFundraiserData(data.contractAddress);
      setHistory(result);
    }
  };

  useEffect(() => {
    getDonateHistory();
    console.log(data);
  }, [data]);

  return (
    <div className={cx('inner-container')}>
      <div className={cx('background')}>
        <WaveIcon />
      </div>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <H3>실시간 기부 내역</H3>
        </div>
        <div className={cx('donate-info')}>
          <div className={cx('participant')}>
            <P color="orange">462</P>
            <P>명의 기부자</P>
          </div>
          <div className={cx('money')}>
            <P>총 모금액</P>
            <H3>100,000</H3>
            <P>SSF</P>
          </div>
        </div>
      </div>
      <div className={cx('history')}>
        {data &&
          history.map((data: any, idx) => {
            console.log(data.account);
            return (
              <div className={cx('history-item')} key={idx}>
                <P>{data.account}</P>
                <div className={cx('money')}>
                  <P>{data.value}</P>
                  <P>SSF</P>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DonateHistory;
