import H3 from 'assets/theme/Typography/H3/H3';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import styles from './DonateHistory.module.scss';
import { ReactComponent as WaveIcon } from 'assets/images/icon/wave.svg';
import { DontationDetailType } from 'types/DonationTypes';
import {
  fundraiserIsWithdraw,
  nowBalance,
  nowFundraiserData,
} from 'services/blockchain/SsfApi';
import { useEffect, useState } from 'react';
import Tag from 'assets/theme/Tag/Tag';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import { fDateDash, fFundraiserContractTime, fToNow } from 'utils/formatTime';

const cx = classNames.bind(styles);
type DonateHistoryProps = {
  data: DontationDetailType;
};
const DonateHistory = ({ data }: DonateHistoryProps) => {
  const [history, setHistory] = useState([]);
  // const [current, setCurrent] = useState(0);
  const [collectedBalance, setCollectedBalance] = useState(0);

  const getDonateHistory = async () => {
    if (data.contractAddress) {
      const result = await nowFundraiserData(data.contractAddress);
      setHistory(result);
    }
  };

  const checkWithdrawState = async () => {
    // (완료) 모금액 수령이 완료되었는지 검사
    const response = await fundraiserIsWithdraw(data.contractAddress);
    setCollectedBalance(response.targetMoney);
  };

  // const getCurrentBalance = async () => {
  //   if (data.contractAddress) {
  //     const result = await nowBalance(data.contractAddress);
  //     setCurrent(result);
  //   }
  // };

  useEffect(() => {
    console.log(data);
    if (data.contractAddress) {
      getDonateHistory();
      checkWithdrawState();
    }
    // getCurrentBalance();
  }, [data]);

  useEffect(() => {
    console.log(history);
  }, [history]);

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
            <P color="orange">{String(history.length)}</P>
            <P>개의 기부내역</P>
          </div>
          <div className={cx('money')}>
            <P>총 모금액</P>
            <H3>{String(collectedBalance)}</H3>
            <P>SSF</P>
          </div>
        </div>
      </div>
      <div className={cx('history')}>
        {data &&
          history.map((data: any, idx) => {
            return (
              <div className={cx('history-item')} key={idx}>
                <div className={cx('history-row')}>
                  <div className={cx('from-account')}>
                    <P>{data.fromAccount}</P>
                    <Span>{fToNow(fFundraiserContractTime(data.date))}</Span>
                  </div>
                </div>
                <div className={cx('money')}>
                  <Tag color="green">{`${data.value} SSF`}</Tag>
                  {/* <Tag>{`${data.value}SSF`}</Tag> */}
                  {/* <P>{data.value}</P> */}
                  {/* <P>SSF</P> */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DonateHistory;
