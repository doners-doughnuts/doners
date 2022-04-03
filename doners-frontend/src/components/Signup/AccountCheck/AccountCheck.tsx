import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Button from 'assets/theme/Button/Button';
import styles from './AccountCheck.module.scss';
import character from 'assets/images/charactor-fox.png';
import { ReactComponent as FoxIcon } from 'assets/images/icon/fox.svg';
import { login } from 'services/api/UserApi';
import { isLoggedState, signupState, nicknameState } from 'atoms/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupForm from '../SignupForm/SignupForm';
import H4 from 'assets/theme/Typography/H4/H4';

const cx = classNames.bind(styles);

const AccountCheck = () => {
  const navigate = useNavigate();
  const setNicknameState = useSetRecoilState(nicknameState);
  // const setSignupState = useSetRecoilState(signupState);
  const [signupAccount, setSignupAccount] = useRecoilState(signupState);
  const setIsLoggedState = useSetRecoilState(isLoggedState);

  const [account, setAccount] = useState<string>('');

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log(accounts);
        setAccount(accounts[0]);
      } else {
        toast.info('Metamask를 설치해주세요!');
        // eslint-disable-next-line no-restricted-globals
        location.href = 'https://metamask.io/download/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setSignupAccount('');
    setIsLoggedState(false);
  }, []);

  useEffect(() => {
    if (account) {
      handleLogin(account);
    }
  }, [account]);

  const handleLogin = async (account: string) => {
    try {
      const result = await login(account);
      console.log(result);
      // // 로그인 성공한 userId와, response로 온 userNickname을 atom에 저장
      toast.success('로그인 성공');
      setIsLoggedState(true);
      // setNicknameState(result.userNickname);
      navigate('/');
    } catch (error) {
      toast.info('등록된 회원정보가 없습니다.');
      setSignupAccount(account);
    }
  };

  return (
    <div className="container">
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('inner-container')}>
              <div className={cx('text-wrapper')}>
                <h1 className={cx('slogan')}>
                  Connect to <span>MetaMask</span>
                </h1>
                <img
                  className={cx('character')}
                  src={character}
                  alt="character"
                />
                <div className={cx('comment-form')}>
                  <div className={cx('description')}>
                    {account ? (
                      <div className={cx('user-account')}>
                        <FoxIcon />
                        <H4>{account}</H4>
                      </div>
                    ) : (
                      <H4>연결하기 버튼을 눌러 지갑을 연동해주세요.</H4>
                    )}
                  </div>
                </div>
              </div>
              {signupAccount ? (
                <SignupForm />
              ) : (
                <div className={cx('buttonRow')}>
                  <Button color="primary" onClick={getAccount} fullWidth>
                    연결하기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountCheck;
