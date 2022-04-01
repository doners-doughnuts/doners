import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from 'assets/theme/Button/Button';
import styles from './SignupForm.module.scss';
import Input from 'assets/theme/Input/Input';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import {
  checkNickname,
  emailSend,
  signupcheck,
  emailcheck,
  login,
} from 'services/api/UserApi';
import { signupState } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import useEmailAuth from 'hooks/useEmailAuth';
import { useSetRecoilState } from 'recoil';

const cx = classNames.bind(styles);
const SignupFormNew = () => {
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
          setRealnameMsg('15자 이하의 실명을 입력해주세요.');
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
      console.log('data', data);
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
          navigate(-1);
        }
      } catch (error) {
        alert('회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요');
      }
    }
  };

  return (
    <div className={signupAccount ? cx('formvis') : cx('forminvis')}>
      <section className={cx('container')}>
        <H2>For the New ones ...</H2>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('inner-container')}>
              <header className={cx('article-header')}>
                <div className={cx('button-wrap')}>
                  <div className={cx('buttons')}></div>
                </div>{' '}
                <div>
                  <H3>회원정보 입력</H3>
                </div>
                <div className={cx('info-wrap')}>
                  <div className={cx('article-info')}>
                    <div>
                      <div>
                        <H4>도너스의 회원이 되신 것을 환영합니다!</H4>
                      </div>
                      <div>
                        <H4>
                          서비스를 이용하기 위해서는 회원님의 정보가 필요해요.
                        </H4>
                      </div>
                      <div className={cx('sub-info')}>
                        <div className={cx('views')}>
                          {/* <span className={cx('sub-text')}>조회수 3409</span> */}
                        </div>
                        <div className={cx('comment')}>
                          {/* <span className={cx('sub-text')}>댓글 800</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputArea}>
                      {/* 유저아이디 */}
                      <div className={styles.inputRow}>
                        <div>
                          {/* <IdIcon fill="#EEE" width="20" height="20" /> */}
                        </div>
                        <div className={styles.input}>
                          <div className={styles.inputWithBtn}>
                            <Input
                              id="nickname"
                              value={nickname}
                              type="text"
                              placeholder="닉네임"
                              disabled={nicknameConfirm ? true : false}
                              onChange={handleInput}
                            />
                            <div className={styles.inputBtn}>
                              <Button
                                type="button"
                                color="secondary"
                                onClick={handleNicknameCheck}
                                disabled={nicknameCheck ? false : true}
                              >
                                확인
                              </Button>
                            </div>
                          </div>
                          {nicknameConfirm ? (
                            <p className={styles.validMsg}>{nicknameMsg}</p>
                          ) : (
                            <p className={styles.invalidMsg}>{nicknameMsg}</p>
                          )}
                        </div>
                      </div>
                      <div className={styles.inputRow}>
                        <div>
                          {/* <EmailIcon fill="#EEE" width="20" height="20" /> */}
                        </div>
                        <div className={styles.input}>
                          <div className={styles.inputWithBtn}>
                            <Input
                              //autoComplete="off"
                              // className={styles.inputData}
                              id="email"
                              value={email}
                              type="email"
                              name="naver"
                              placeholder="이메일"
                              disabled={isSend ? true : false}
                              // ref={emailRef}
                              onChange={handleInput}
                            />
                            <div className={styles.inputBtn}>
                              <Button
                                type="button"
                                color="secondary"
                                onClick={handleEmailSendCheck}
                                disabled={emailCheck ? false : true}
                              >
                                전송
                              </Button>
                            </div>
                          </div>
                          {/* <p>{emailMsg}</p>
                          <p>{emailConfirmMsg}</p> */}
                          {!isSend ? (
                            <p className={styles.validMsg}>{emailMsg}</p>
                          ) : (
                            <p className={styles.invalidMsg}>
                              {emailConfirmMsg}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* 이름 */}
                      <div className={styles.inputRow}>
                        <div className={styles.input}>
                          <Input
                            //autoComplete="off"
                            id="realname"
                            value={realname}
                            type="text"
                            placeholder="실명"
                            // ref={nameRef}
                            onChange={handleInput}
                          />
                          <p className={styles.invalidMsg}>{realnameMsg}</p>
                        </div>
                      </div>
                    </div>
                    <Button color="primary" type="submit">
                      회원가입 완료
                    </Button>
                  </form>
                </div>
              </header>
              <main className={cx('content')}></main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignupFormNew;
