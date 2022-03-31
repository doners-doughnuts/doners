import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import Button from 'assets/theme/Button/Button';
import styles from './SignupForm.module.scss';
import Input from 'assets/theme/Input/Input';
import EmailAuthValidation from './EmailAuthValidation';
import SignUpValidation from './SignUpValidation';
import { checkNickname, signupcheck } from 'services/api/UserApi';
import { signupState } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import useEmailAuth from 'hooks/useEmailAuth';
import { useSetRecoilState } from 'recoil';

const cx = classNames.bind(styles);

const SignupForm = () => {
  const navigate = useNavigate();
  const [emailvailerror, SetEmailvailerror] = useState();
  const [emailvailerrormsg, SetEmailvailerrorMsg] = useState('');
  const [emailsendmsg, Setemailsendmsg] = useState('');
  const [authmail, sendAuthMail] = useState(false);
  const [disabledattr, setDisabledattr] = useState(false);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      realname: '',
      authmail: false,
      nickname: '',
      email: '',
    },
    onSubmit: async (submitValues) => {
      console.log(submitValues);
      alert('회원가입 시도');
      // console.log(checkNickname(submitValues.nickname));
      //const result = handlesignup();
      // console.log(result);
      console.log('회원가입 완료');
      alert('회원가입 완료');
      navigate(-1);
    },
    validate: SignUpValidation,
  });

  const signupvisible = useRecoilValue(signupState);

  // const signup = async (nickname: any) => {
  //   try {
  //     const result = await checkNickname(nickname);
  //     console.log(result);
  //     Setemailsendmsg(result.data.message);
  //   } catch (error) {}
  // };

  // const handlesignup = () => {
  //   try {
  //     const result = signupcheck(
  //       values.realname,
  //       values.email,
  //       signupvisible,
  //       values.nickname
  //     );
  //     console.log(result);
  //   } catch (error) {}
  // };

  const handleEmailSend = async (email: any) => {
    try {
      //const result = await emailConfirm(email);
      Setemailsendmsg('전송된 메일의 링크를 눌러주세요.');
      //    console.log(result);
    } catch (error) {
      Setemailsendmsg('이미 메일을 전송하였습니다. 메일을 확인해주세요');
    }
  };
  const isEmail = (email: any) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  const emailAuthentication = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetEmailvailerrorMsg('');
    Setemailsendmsg('');
    //이메일 유효성 확인..
    if (!values.email) {
      SetEmailvailerrorMsg('이메일을 입력해주세요.');
    } else if (!isEmail(values.email)) {
      SetEmailvailerrorMsg('이메일 형식으로 입력해주세요.');
    } else if (!isEmail(values.email)) {
      //
      SetEmailvailerrorMsg('이미 인증이 완료된 이메일입니다.');
    } else {
      sendAuthMail(true);
      handleChange(event);
      handleEmailSend(values.email);
      setDisabledattr(true);
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
          id="email"
          type="email"
          name="email"
          error={errors.authmail ? true : false}
          onChange={handleChange}
          disabled={disabledattr}
        />
        <div>{errors.authmail}</div>
        <div>{emailvailerrormsg}</div>
        <div>{emailsendmsg}</div>
        <Button type="button" color="alternate">
          인증
        </Button>
        {/* Button 안에 onClick={emailAuthentication} 함수 있었음 */}
        <Button
          type="submit"
          disabled={isLoading}
          color="primary"
          // onClick={emailAuthentication}
        >
          {isLoading ? '진행중' : '회원가입 완료'}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
