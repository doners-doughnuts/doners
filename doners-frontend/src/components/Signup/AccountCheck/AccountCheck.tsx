import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from 'assets/theme/Button/Button';
import styles from './AccountCheck.module.scss';
import { login } from 'services/api/UserApi';
import { isLoggedState, signupState } from 'atoms/atoms';
import { useSetRecoilState } from 'recoil';

const cx = classNames.bind(styles);

const AccountCheck = () => {
  const navigate = useNavigate();
  const setSignupState = useSetRecoilState(signupState);
  const setIsLoggedState = useSetRecoilState(isLoggedState);

  const [account, setAccount] = useState<string>('');
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } else {
        alert('Metamask를 설치해주세요!');
        // eslint-disable-next-line no-restricted-globals
        location.href = 'https://metamask.io/download/';
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setSignupState('');
  }, []);
  useEffect(() => {
    if (account) {
      console.log('metamask지갑주소');
      console.log(account);
      console.log('api호출위치');

      handleLogin(account);
      // let result2 = login(account);
      //console.log(result2);
    }
  }, [account]);

  const handleLogin = async (account: any) => {
    try {
      const result = await login(account);
      console.log('Login 성공');
      console.log(result.statusCode);

      if (result.statusCode == 200) {
        // // 로그인 성공한 userId와, response로 온 userNickname을 atom에 저장
        // setLoggedUserState({
        //   userId: loginInfo.userId,
        //   userNickname: result.userNickname,
        // });
        setIsLoggedState(true);
        // 이전으로 돌아갈 수 있어야 하므로 history 유지
        // navigate(-1);
        //// navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
      setSignupState(account);
    }
  };

  return (
    <div className="container">
      <div>Connect to MetaMask</div>
      {account !== ''
        ? '존재하지 않는 회원입니다.'
        : '연결하기 버튼을 눌러 연결해주세요 '}
      {account}
      <Button color="primary" onClick={getAccount}>
        연결하기
      </Button>
      <a>지갑 사용방법이 궁금하다면?</a>
    </div>
  );
};

export default AccountCheck;
