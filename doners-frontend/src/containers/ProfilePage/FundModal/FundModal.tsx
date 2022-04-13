import classNames from 'classnames/bind';
import styles from './FundModal.module.scss';
import { useEffect, useState } from 'react';
import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import Span from 'assets/theme/Typography/Span/Span';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H4 from 'assets/theme/Typography/H4/H4';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import {
  nowBalance,
  nowFundraiserCount,
  withdraw,
} from 'services/blockchain/SsfApi';
import { getWalletAccount } from 'utils/walletAddress';
import { toast } from 'react-toastify';
import { deleteClosedDonation } from 'services/api/Donation';
const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  // user: string;
};
const FundModal = (props: {
  open?: any;
  close?: any;
  contractAddress: string;
  targetAmount: number;
  donationId: string;
}) => {
  const { open, close, contractAddress, targetAmount, donationId } = props;

  const [target, setTarget] = useState(targetAmount);
  const [totalDoners, setTotalDoners] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let rate = Math.floor((current / target) * 100);

  // console.log(target);

  /* 모금액 수령하기 */
  const handleWithdraw = async () => {
    try {
      if (walletAddress) {
        setIsLoading(true);
        await withdraw(contractAddress, walletAddress);
        setIsLoading(false);
        toast.success('성공적으로 모금수령이 되었습니다!');
        await deleteClosedDonation(donationId);
      }
    } catch (error) {
      toast.error('모금수령에 문제가 있었습니다. 관리자에게 문의하세요.');
    }

    close();
  };

  /* 모금 달성률 */
  const calcAchievementRate = async () => {
    // let rate = Math.floor((current / target) * 100);
    const currentBalance = await nowBalance(contractAddress);
    // console.log(currentBalance);
    setCurrent(currentBalance);
  };

  /* 총 기부자 */
  const getTotalDoners = async () => {
    const doners = await nowFundraiserCount(contractAddress);
    // console.log(doners);
    setTotalDoners(doners);
  };

  /* 사용자의 지갑주소 */
  const getUserWalletAddress = async () => {
    const address = await getWalletAccount();
    setWalletAddress(address);
  };

  useEffect(() => {
    //// getApplicationDetail();
    calcAchievementRate();
    getUserWalletAddress();
    getTotalDoners();
  }, []);

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        isLoading ? (
          <div className={cx('loading-spinner')}>
            <img
              src="https://static.toss.im/3d/money-wings-confetti-apng.png"
              alt="loading spinner"
            />
            <div className={cx('text-background', 'green')}>
              <H3>기부금을 수령하고 있어요.</H3>
            </div>
          </div>
        ) : (
          <section>
            <header>
              모금액 수령하기
              <button className={cx('close')} onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <div className={cx('total_fund_raised')}>
                <div className={cx('data-row')}>
                  <div className={cx('value-row')}>
                    <div className={cx('value-title')}>
                      <H4>총 모금액 </H4>
                    </div>
                    <H2>{String(current)}</H2>
                    <H4>SSF</H4>
                  </div>
                  <div className={cx('people-row')}>
                    <div className={cx('value-title')}>
                      <H4>총</H4>
                    </div>
                    <H3>{String(totalDoners)}</H3>
                    <H4> 명의 기부자</H4>
                  </div>
                  <Progressbar value={rate} />
                  <div className={cx('')}>
                    <div className={cx('date-title')}>
                      <Span color="gray">모금액 달성률 : </Span>
                      <Span color="green">
                        {String(Math.floor((current / target) * 100)).concat(
                          '%'
                        )}
                      </Span>
                      <Span color="gray">{`(${current} SSF)`}</Span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('title')}>수령할 지갑 주소</div>
              <div className={cx('input')}>
                <div className={cx('inputWithBtn')}>
                  <Input
                    id="nickname"
                    value={walletAddress}
                    type="text"
                    disabled={true}
                  />
                  <div className={cx('inputBtn')}></div>
                </div>
              </div>
            </main>
            <footer>
              <Button color="primary" size="large" onClick={handleWithdraw}>
                수령하기
              </Button>
            </footer>
          </section>
        )
      ) : null}
    </div>
  );
};

export default FundModal;
