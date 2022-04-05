import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H1 from 'assets/theme/Typography/H1/H1';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getDonationDetail } from 'services/api/Donation';
import { nowBalance } from 'services/blockchain/SsfApi';
import styles from './TotalDonate.module.scss';

const cx = classNames.bind(styles);

type donationProps = {
  donation_id: string;
};
const TotalDonate = ({ donation_id }: any) => {
  const [contractAddress, setContractAddress] = useState('');
  const [current, setCurrent] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [rate, setRate] = useState(0);

  const handleDonateDetail = async () => {
    const result = await getDonationDetail(donation_id);
    setContractAddress(result.data.contractAddress);
    setTargetAmount(result.data.targetAmount);
    console.log(result);
  };

  const getCurrentBalance = async () => {
    if (contractAddress) {
      const result = await nowBalance(contractAddress);
      setCurrent(result);
    }
  };

  useEffect(() => {
    handleDonateDetail();
  }, []);

  useEffect(() => {
    getCurrentBalance();
  }, [contractAddress]);

  useEffect(() => {
    const result = Math.floor((current / targetAmount) * 100);
    console.log(result);
    setRate(result);
  }, [current]);

  return (
    <div className={cx('form')}>
      <P>총 모금액</P>
      <div className={cx('achieved-money')}>
        <H1>{String(current)}</H1>
        <P>SSF</P>
      </div>
      <div className={cx('target-money')}>
        <H3 color="gray">{String(targetAmount)}</H3>
        <H4 color="gray"> SSF 목표</H4>
      </div>
      <Progressbar value={rate} />
      <div className={cx('achived-rate')}>
        <Span color="gray">모금액 달성률: </Span>
        <Span color="green">{`${String(rate)}%`}</Span>
      </div>
    </div>
  );
};

export default TotalDonate;
