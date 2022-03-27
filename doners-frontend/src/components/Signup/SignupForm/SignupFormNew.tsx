import React, { createRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from 'assets/theme/Button/Button';
import styles from './SignupForm.module.scss';
import Input from 'assets/theme/Input/Input';
import EmailAuthValidation from './EmailAuthValidation';
import SignUpValidation from './SignUpValidation';
import {
  checkNickname,
  emailSend,
  signupcheck,
  emailcheck,
} from 'services/api/UserApi';
import { signupState } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import useEmailAuth from 'hooks/useEmailAuth';
import { useSetRecoilState } from 'recoil';

const cx = classNames.bind(styles);
const SignupFormNew = () => {
  const idRef = createRef();
  const pwdRef = createRef();
  const confirmPwdRef = createRef();
  const emailRef = createRef();
  const confirmEmailRef = createRef();
  const nameRef = createRef();

  // 입력 폼 데이터
  const [realname, setRealname] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  // 유효성 검사 메시지
  const [realnameMsg, setRealnameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [emailConfirmMsg, setEmailConfirmMsg] = useState('');

  // 이메일 인증 버튼 클릭 유무
  const [isSend, setIsSend] = useState(false);

  // 유효성 검사 통과 flag
  const [realnameCheck, setRealnameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  // 아이디, 이메일 검사 결과
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);

  const navigate = useNavigate();
  const signupAccount = useRecoilValue(signupState);

  // 입력 데이터 관리
  const handleInput = (event: { target: { id: any; value: any } }) => {
    const realnamePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    const emailPattern =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const nicknamePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const { id: target, value } = event.target;
    switch (target) {
      case 'nickname':
        setNickname(value);
        if (value.length < 2 && value.length > 0) {
          setNicknameMsg('2자 이상의 닉네임을 입력해주세요.');
        } else if (value.length > 10) {
          setNicknameMsg('10자 이하의 닉네임을 입력해주세요.');
        } else if (value === '') {
          setNicknameMsg('닉네임을 입력해주세요');
        } else if (!nicknamePattern.test(value)) {
          setNicknameMsg('닉네임은 특수기호가 불가능합니다.');
        } else {
          setNicknameMsg('');
          setNicknameCheck(true);
        }
        break;
      case 'email':
        setEmail(value);
        if (!emailPattern.test(value)) {
          setEmailMsg('올바른 이메일 형식으로 입력해주세요.');
        } else {
          setEmailMsg('');
          setEmailCheck(true);
        }
        break;
      //   case 'emailConfirmCode':
      //     setEmailConfirmCode(value);
      //     break;
      case 'realname':
        setRealname(value);
        if (!realnamePattern.test(value)) {
          setRealnameMsg('한글과 영어만 입력이 가능합니다.');
        } else if (value === '') {
          setRealnameMsg('실명을 입력해주세요.');
        } else if (value.length < 2 && value.length > 0) {
          setRealnameMsg('2자 이상의 실명을 입력해주세요.');
        } else if (value.length > 10) {
          setNicknameMsg('15자 이하의 실명을 입력해주세요.');
        } else {
          setRealnameMsg('');
          setRealnameCheck(true);
        }
        break;
      default:
        console.log('error');
    }
  };

  // 닉네임 중복 검사
  const handleNicknameCheck = async () => {
    // 닉네임 중복 검사 api 호출
    try {
      const data = await checkNickname(nickname);
      console.log('data', data);
      if (!data) {
        setNicknameMsg('중복된 닉네임 입니다.');
      } else {
        setNicknameConfirm(true);
        setNicknameMsg('사용가능합니다.');
      }
    } catch ({ response }) {
      setNicknameMsg('중복된 닉네임 입니다.');
    }
  };

  // 이메일 인증번호 검사
  const handleEmailSendCheck = async () => {
    setEmailMsg('');
    // 이메일 인증번호 검사 api 호출
    try {
      const data = await emailSend(email);
      if (!data) {
        setEmailMsg('이미 인증된 이메일 입니다.');
      } else {
        setIsSend(true);
        setEmailMsg('이메일이 발송되었습니다.');
      }

      // setEmailConfirmCodeMsg(data.message);
    } catch ({ response }) {
      setEmailMsg('메일 전송에 실패하였습니다. 새로고침 해주세요.');
    }
  };

  const handleEmailCheck = async () => {
    try {
      const data = await emailcheck(email);
      console.log(data);
      if (!data) {
        setEmailConfirmMsg('메일을 확인해주세요.');
      } else {
        setEmailConfirm(true);
        setEmailConfirmMsg('인증이 완료되었습니다.');
      }
    } catch (error) {
      setEmailConfirmMsg('메일을 확인해주세요.');
    }
  };

  // 회원가입 버튼 클릭 시 이벤트
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await emailcheck(email);
      console.log(data);
      if (!data) {
        setEmailConfirmMsg('메일을 확인해주세요.');
      } else {
        setEmailConfirm(true);
        setEmailConfirmMsg('인증이 완료되었습니다.');
      }
    } catch (error) {
      setEmailConfirmMsg('메일을 확인해주세요.');
    }

    if (!nicknameConfirm) {
      setNicknameMsg('닉네임을 확인해주세요.');
    } else if (!isSend) {
      setEmailMsg('이메일 인증이 필요합니다.');
    } else if (!emailCheck) {
      setEmailMsg('이메일을 확인해주세요.');
    } else if (!realnameCheck) {
      setRealnameMsg('이름을 확인해주세요.');
    } else if (!emailConfirm) {
      setEmailConfirmMsg('인증을 완료해주세요.');
    } else {
      const bodyparams = {
        userAccount: signupAccount,
        userCode: 'USER',
        userEmail: email,
        userName: realname,
        userNickname: nickname,
      };
      // //회원가입 api 호출
      try {
        const response = await signupcheck(bodyparams);
        if (!response) {
          console.log(response);
          alert('회원가입 실패');
        } else {
          console.log(response);
          alert('회원가입 완료');
        }

        //navigate(-1);
      } catch (error) {
        alert('회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요');
      }
    }
  };

  return (
    <div className={signupAccount ? cx('formvis') : cx('forminvis')}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputArea}>
          {/* 유저아이디 */}
          <div className={styles.inputRow}>
            <div>{/* <IdIcon fill="#EEE" width="20" height="20" /> */}</div>
            <div className={styles.input}>
              <div className={styles.inputWithBtn}>
                <input
                  //ref={idRef}
                  autoComplete="off"
                  className={styles.inputData}
                  id="nickname"
                  value={nickname}
                  type="text"
                  placeholder="닉네임"
                  disabled={nicknameConfirm ? true : false}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className={styles.checkBtn}
                  onClick={handleNicknameCheck}
                  disabled={nicknameCheck ? false : true}
                >
                  확인
                </button>
              </div>
              {nicknameConfirm ? (
                <p className={styles.validMsg}>{nicknameMsg}</p>
              ) : (
                <p className={styles.invalidMsg}>{nicknameMsg}</p>
              )}
            </div>
          </div>
          {/* 이메일 */}
          <div className={styles.inputRow}>
            <div>{/* <EmailIcon fill="#EEE" width="20" height="20" /> */}</div>
            <div className={styles.input}>
              <div className={styles.inputWithBtn}>
                <input
                  autoComplete="off"
                  id="email"
                  className={styles.inputData}
                  value={email}
                  type="email"
                  placeholder="이메일"
                  disabled={emailConfirm ? true : false}
                  // ref={emailRef}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className={styles.checkBtn}
                  onClick={handleEmailSendCheck}
                  disabled={emailCheck ? false : true}
                >
                  전송
                </button>
              </div>
              <p className={styles.invalidMsg}>{emailConfirmMsg}</p>
              {/* {emailConfirm ? (
                <p className={styles.validMsg}>{emailConfirmMsg}</p>
              ) : (
                <p className={styles.invalidMsg}>{emailConfirmMsg}</p>
              )} */}
            </div>
          </div>
          {/* 이름 */}
          <div className={styles.inputRow}>
            <div className={styles.input}>
              <input
                autoComplete="off"
                id="realname"
                className={styles.inputData}
                value={realname}
                type="text"
                placeholder="실명"
                // ref={nameRef}
                onChange={handleInput}
              />
              <p className={styles.invalidMsg}>{realnameMsg}</p>
            </div>
          </div>
          <button className={styles.registBtn} type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignupFormNew;
