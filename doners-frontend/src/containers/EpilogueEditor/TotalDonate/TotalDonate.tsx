import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H1 from 'assets/theme/Typography/H1/H1';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getDonationDetail } from 'services/api/Donation';
import { fundraiserIsWithdraw, nowBalance } from 'services/blockchain/SsfApi';
import styles from './TotalDonate.module.scss';

const cx = classNames.bind(styles);

type donationProps = {
  donation_id: string;
};
const TotalDonate = ({ donationId }: any) => {
  const [contractAddress, setContractAddress] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [rate, setRate] = useState(0);

  const [collectedBalance, setCollectedBalance] = useState(0);

  const handleDonateDetail = async () => {
    const result = await getDonationDetail(donationId);
    console.log(result);
    setContractAddress(result.data.contractAddress);
    setTargetAmount(result.data.targetAmount);
  };

  const checkWithdrawState = async () => {
    // (완료) 모금액 수령이 완료되었는지 검사
    const response = await fundraiserIsWithdraw(contractAddress);
    console.log(response);
    setCollectedBalance(response.targetMoney);
  };

  // const getCurrentBalance = async () => {
  //   if (contractAddress) {
  //     const result = await nowBalance(contractAddress);
  //     setCurrent(result);
  //   }
  // };

  useEffect(() => {
    if (donationId) {
      handleDonateDetail();
    }
  }, [donationId]);

  useEffect(() => {
    // getCurrentBalance();
    if (contractAddress) {
      checkWithdrawState();
    }
  }, [contractAddress]);

  useEffect(() => {
    const result = Math.floor((collectedBalance / targetAmount) * 100);
    setRate(result);
  }, [collectedBalance]);

  return (
    <div className={cx('form')}>
      <div className={cx('achieved-money')}>
        <H1>{String(collectedBalance)}</H1>
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
