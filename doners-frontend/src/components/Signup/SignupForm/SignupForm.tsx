import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import Button from 'assets/theme/Button/Button';
import styles from './SignupForm.module.scss';
import Input from 'assets/theme/Input/Input';
import EmailAuthValidation from './EmailAuthValidation';
import SignUpValidation from './SignUpValidation';
import { signupState } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import useEmailAuth from 'hooks/useEmailAuth';

const cx = classNames.bind(styles);

const SignupForm = () => {
  const [emailvailerror, SetEmailvailerror] = useState();
  const [emailvailerrormsg, SetEmailvailerrorMsg] = useState('');
  const [authmail, sendAuthMail] = useState(false);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      realname: '',
      authmail: false,
      nickname: '',
      email: '',
    },
    onSubmit: async (submitValues) => {
      console.log(submitValues);
    },
    validate: SignUpValidation,
  });

  const signupvisible = useRecoilValue(signupState);

  const isEmail = (email: any) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  const emailAuthentication = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('이메일 전송 api');
    SetEmailvailerrorMsg('');

    //이메일 유효성 확인..
    if (!values.email) {
      SetEmailvailerrorMsg('이메일을 입력해주세요.');
    } else if (!isEmail(values.email)) {
      SetEmailvailerrorMsg('이메일 형식으로 입력해주세요.');
    } else {
      sendAuthMail(true);
      handleChange(event);
    }
  };

  useEffect(() => {
    console.log('signupvisible', signupvisible);
  }, [signupvisible]);

  useEffect(() => {}, []);

  return (
    <div className={signupvisible ? cx('formvis') : cx('forminvis')}>
      <div>For the New ones ...</div>
      <div>회원정보 입력</div>
      <div>도너스의 회원이 되신 것을 환영합니다!</div>
      <div>서비스를 이용하기 위해서는 회원님의 정보가 필요해요.</div>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          value={values.nickname}
          placeholder="닉네임"
          name="nickname"
          error={errors.nickname ? true : false}
          onChange={handleChange}
        />
        <div>{errors.nickname}</div>
        <Input
          value={values.realname}
          placeholder="성명(주민등록상 이름)"
          name="realname"
          error={errors.realname ? true : false}
          onChange={handleChange}
        />
        <div>{errors.realname}</div>
        <Input
          placeholder="이메일"
          value={values.email}
          type="email"
          name="email"
          error={errors.authmail ? true : false}
          onChange={handleChange}
        />
        <div>{errors.authmail}</div>
        <div>{emailvailerrormsg}</div>
        <Button type="button" color="alternate" onClick={emailAuthentication}>
          인증
        </Button>
        <Button type="submit" disabled={isLoading} color="primary">
          {isLoading ? '진행중' : '회원가입 완료'}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
