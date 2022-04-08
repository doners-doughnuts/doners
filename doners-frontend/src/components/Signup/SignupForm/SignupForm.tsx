import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import Button from 'assets/theme/Button/Button';
import styles from './SignupForm.module.scss';
import Input from 'assets/theme/Input/Input';
import EmailAuthValidation from './EmailAuthValidation';
import SignUpValidation from './SignUpValidation';
import {
  checkNickname,
  emailcheck,
  emailSend,
  login,
  signup,
} from 'services/api/UserApi';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import P from 'assets/theme/Typography/P/P';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { signupState } from 'atoms/atoms';

const cx = classNames.bind(styles);

const SignupForm = () => {
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isRegist, setIsRegist] = useState(false);
  const [throttle, setThrottle] = useState(false);
  const signupAccount = useRecoilValue(signupState);

  const navigate = useNavigate();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      realname: '',
      nickname: '',
      email: '',
    },
    onSubmit: async (submitValues) => {
      try {
        await emailcheck(submitValues.email);
        const body = {
          userAccount: signupAccount,
          userEmail: submitValues.email,
          userName: submitValues.realname,
          userNickname: submitValues.nickname,
          userCode: 'USER',
        };
        await signup(body);
        toast.success('회원가입이 완료되었습니다.');
        await login(signupAccount);
        navigate(-1);
      } catch (error) {
        toast.error('이메일 인증이 완료되지 않았습니다.');
      }
    },
    validate: SignUpValidation,
  });

  const handleNicknameCheck = () => {
    checkNicknameApi();
  };

  const checkNicknameApi = async () => {
    try {
      await checkNickname(values.nickname);
      setNicknameCheck(true);
      toast.success('사용가능한 닉네임입니다.');
    } catch (error) {
      console.log(error);
      toast.error('사용중인 닉네임입니다.');
      // setNicknameCheck(false)
    }
  };

  const handleEmailSend = () => {
    if (throttle) return;
    if (!throttle) {
      sendEmail();
    }
  };

  const sendEmail = async () => {
    try {
      setIsEmailSend(true);
      // setTimeout(async () => {
      await emailSend(values.email);
      setThrottle(false);
      toast.success('이메일을 발송했습니다. 이메일을 확인해주세요.');
      // }, 300);
    } catch (error) {
      toast.error('이미 사용중인 이메일입니다.');
      setIsEmailSend(false);
    }
  };
  useEffect(() => {
    if (errors.realname) {
      toast.error(errors.realname);
    }
    if (errors.nickname) {
      toast.error(errors.nickname);
    }
    if (errors.email) {
      toast.error(errors.email);
    }
  }, [errors]);

  useEffect(() => {
    if (isEmailSend && nicknameCheck) {
      setIsRegist(true);
    }
  }, [isEmailSend, nicknameCheck]);
  return (
    <div className={cx('signup-container')}>
      <H2>For the New ones ...</H2>
      <div className={cx('signup-innerContainer')}>
        <div className={cx('signup-info')}>
          <div className={cx('signup-title')}>
            <H3>회원정보 입력</H3>
          </div>
          <P>도너스의 회원이 되신 것을 환영합니다!</P>
          <P>서비스를 이용하기 위해서는 회원님의 정보가 필요해요.</P>
        </div>
        <div className={cx('signup-form')}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={cx('input-row', 'realname-wrapper')}>
              <Input
                value={values.realname}
                placeholder="성명(주민등록상 이름)"
                name="realname"
                error={errors.realname ? true : false}
                onChange={handleChange}
                size="large"
              />
            </div>
            <div className={cx('input-row', 'nickname-wrapper')}>
              <div className={cx('input-wrap')}>
                <div className={cx('input')}>
                  <Input
                    value={values.nickname}
                    placeholder="닉네임"
                    name="nickname"
                    error={errors.nickname ? true : false}
                    onChange={handleChange}
                    size="large"
                    disabled={nicknameCheck}
                  />
                </div>
                <div className={cx('button')}>
                  <Button
                    type="button"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={handleNicknameCheck}
                    disabled={nicknameCheck}
                  >
                    검사
                  </Button>
                </div>
              </div>
              {/* <div>{errors.nickname}</div> */}
            </div>
            <div className={cx('input-row', 'nickname-wrapper')}>
              <div className={cx('input-wrap')}>
                <div className={cx('input')}>
                  <Input
                    placeholder="이메일"
                    value={values.email}
                    id="email"
                    type="email"
                    name="email"
                    error={errors.email ? true : false}
                    onChange={handleChange}
                    disabled={isEmailSend}
                    size="large"
                  />
                </div>
                <div className={cx('button')}>
                  <Button
                    type="button"
                    size="large"
                    color="secondary"
                    fullWidth
                    onClick={handleEmailSend}
                    disabled={isEmailSend}
                  >
                    인증
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!isRegist}
              color="primary"
              fullWidth
              size="large"
            >
              회원가입
            </Button>
            {/* Button 안에 onClick={emailAuthentication} 함수 있었음 */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
