import classNames from 'classnames/bind';
import styles from './DonateModal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/images/icon/close.svg';
import { ReactComponent as DollarIcon } from 'assets/images/icon/dollar.svg';
import { ReactComponent as AddIcon } from 'assets/images/icon/add.svg';
import { ReactComponent as MinusIcon } from 'assets/images/icon/minus.svg';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import H2 from 'assets/theme/Typography/H2/H2';
import { ReactComponent as FoxIcon } from 'assets/images/icon/fox.svg';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { DontationDetailType } from 'types/DonationTypes';
import { getWalletAccount } from 'utils/walletAddress';
import {
  approveTransaction,
  donate,
  getSSFBalance,
} from 'services/blockchain/SsfApi';

const cx = classNames.bind(styles);

type modalType = {
  data: DontationDetailType;
  open: boolean;
  onClose: any;
};
const DonateModal = ({ data, open, onClose }: modalType) => {
  const [money, setMoney] = useState(1);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [approveLoading, setApproveLoading] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const getAccount = async () => {
    const value = await getWalletAccount();
    setAccount(value);
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (account) {
      console.log(account);
      getBalance();
    }
  }, [account]);

  const getBalance = async () => {
    console.log(account);
    const result = await getSSFBalance(account);
    setBalance(result);
  };

  const handleAddClick = () => {
    console.log(money);

    setMoney((prev) => prev + 1);
  };
  const handleMinusClick = () => {
    console.log(money);
    setMoney((prev) => prev - 1);
  };

  const handleDonateClick = () => {
    if (balance > money) {
      donateApi();
    } else {
      toast.error('잔액이 부족합니다. 잔액을 확인해주세요.');
    }
  };

  const donateApi = async () => {
    try {
      setApproveLoading(true);
      const approveResult = await approveTransaction(
        data.contractAddress,
        account,
        money
      );
      if (approveResult.status) {
        setApproveLoading(false);
      }
      console.log(approveResult);
      setDonateLoading(true);
      const donateResult = await donate(data.contractAddress, account, money);
      console.log(donateResult);
      if (donateResult.status) {
        setDonateLoading(false);
      }
      setCompleteLoading(true);
      setTimeout(() => {
        setCompleteLoading(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // const test = async () => {
  //   const result = await nowBalance(
  //     '0xc86F168f8D5b22C677c0184C2865C11Dc5921951'
  //   );
  //   console.log(result);
  // };
  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <div className={cx('modal', { openModal: open === true })}>
      {open ? (
        approveLoading ? (
          <div className={cx('loading-spinner')}>
            <img
              src="https://static.toss.im/3d-emojis/u1F913-apng.png"
              alt="loading spinner"
            />
            <H3>잠시만요! 요청을 처리하고 있어요.</H3>
          </div>
        ) : donateLoading ? (
          <div className={cx('loading-spinner')}>
            <img
              src="https://static.toss.im/3d/money-wings-confetti-apng.png"
              alt="loading spinner"
            />
            <H3>송금하는중이에요.</H3>
          </div>
        ) : completeLoading ? (
          <div className={cx('loading-spinner')}>
            <img
              src="https://static.toss.im/3d-emojis/u1F389_apng.png"
              alt="loading spinner"
            />
            <H3>기부해줘서 고마워요.</H3>
          </div>
        ) : (
          <section className={cx('modalForm')}>
            <div className={cx('header')}>
              <H2>기부하기</H2>
              <div className={cx('close-btn')} onClick={() => onClose()}>
                <CloseIcon />
              </div>
            </div>
            <div>
              <div className={cx('title')}>
                <H3>기부자 지갑 주소</H3>
              </div>
              <div className={cx('wallet-row')}>
                <div className={cx('wallet-form')}>
                  <div className={cx('description')}>
                    <div className={cx('wallet-account')}>
                      <FoxIcon />
                      <H4>{account}</H4>
                    </div>
                  </div>
                </div>
                <div className={cx('money')}>
                  <div className={cx('icon')}>
                    <DollarIcon />
                  </div>
                  <H3>{String(balance)}</H3>
                  <H4>SSF</H4>
                </div>
              </div>

              <div className={cx('title')}>
                <H3>기부 금액</H3>
                <Span>기부 가능 액수 : 최소 1SSF ~ 최대 </Span>
                <Span>{String(balance)}</Span>
                <Span>SSF</Span>
              </div>
              <div className={cx('donate-form')}>
                <div className={cx('donate-money-wrap')}>
                  <div className={cx('donate-money-row')}>
                    <MinusIcon onClick={handleMinusClick} />
                    <div className={cx('donate-money-info')}>
                      <div className={cx('donate-money')}>
                        <div className={cx('money')}>
                          <H1>{money}</H1>
                        </div>
                        <H4>SSF</H4>
                      </div>
                      <div>(약 900,000원)</div>
                    </div>
                    <AddIcon onClick={handleAddClick} />
                  </div>
                </div>
                <div className={cx('btn-row')}>
                  <div className={cx('donate-btn')}>
                    <Button
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleDonateClick}
                    >
                      기부하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      ) : null}
    </div>
  );
};

export default DonateModal;
