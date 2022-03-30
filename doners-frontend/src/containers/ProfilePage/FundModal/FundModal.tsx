import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FundModal.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import { checkNickname } from 'services/api/UserApi';
import Avatar from 'assets/theme/Avatar/Avatar';
import Span from 'assets/theme/Typography/Span/Span';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H4 from 'assets/theme/Typography/H4/H4';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  // user: string;
};
const FundModal = (props: { open?: any; close?: any }) => {
  const { open, close } = props;
  const [target, setTarget] = useState(3.89);
  const [totalpeople, setTotalpeople] = useState(234);
  const [current, setCurrent] = useState(1.0);
  const [nickname, setNickname] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  let rate = Math.floor((current / target) * 100);
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!nicknameConfirm) {
      setNicknameMsg('닉네임을 확인해주세요.');
    } else {
      const bodyparams = {
        userNickname: nickname,
      };
      // //회원가입 api 호출
      try {
      } catch (error) {
        alert('회원가입에 실패했습니다. 새로고침 후 다시 시도해주세요');
      }
    }
  };

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        <section>
          <header>
            모금액 수령하기
            <button className={cx('close')} onClick={close}>
              &times;
            </button>
          </header>{' '}
          <main>
            <div className={cx('total_fund_raised')}>
              <div className={cx('data-row')}>
                {' '}
                <div className={cx('value-row')}>
                  <div className={cx('value-title')}>
                    <H4>총 모금액 </H4>
                  </div>
                  <H2>{String(target)}</H2>
                  <H4>SSF</H4>
                </div>
                <div className={cx('people-row')}>
                  <div className={cx('value-title')}>
                    <H4>총</H4>
                  </div>
                  <H3>{String(totalpeople)}</H3>
                  <H4> 명의 기부자</H4>
                </div>
                <Progressbar value={rate} />
                <div className={cx('')}>
                  <div className={cx('date-title')}>
                    <Span color="gray">모금액 달성률 : </Span>{' '}
                    <Span color="green">{String(rate).concat('%')}</Span>
                    <Span color="gray"> (0.010212 SSF)</Span>{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('title')}>수령할 지갑 주소</div>
            <div className={cx('input')}>
              <div className={cx('inputWithBtn')}>
                <Input
                  id="nickname"
                  value={nickname}
                  type="text"
                  disabled={true}
                />
                <div className={cx('inputBtn')}></div>
              </div>
            </div>
          </main>
          <footer>
            <Button color="primary" size="large" onClick={close}>
              수령하기
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default FundModal;