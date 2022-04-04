import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileModal.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import { checkNickname, getUserProfile } from 'services/api/UserApi';
import Avatar from 'assets/theme/Avatar/Avatar';
import { getLoggedUserNickname } from 'utils/loggedUser';

const cx = classNames.bind(styles);

type ProfileType = {
  focus: number;
  // user: string;
};
const ProfileModal = (props: { open?: any; close?: any }) => {
  const { open, close } = props;
  const [nickname, setNickname] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  const [userProfileImg, setUserProfileImg] = useState('');
  const [imgFile, setImgFile] = useState('');

  const handleInput = (event: { target: { id: any; value: any } }) => {
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
      default:
        console.log('error');
    }
  };

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

  const getUserProfileImg = async () => {
    const { data } = await getUserProfile(getLoggedUserNickname());
    setUserProfileImg(data);
  };

  // const onChange = (e) => {
  //   if (e.target.files[0]) {
  //     const formData = new FormData();
  //     formData.append(
  //       'multipartFile',
  //       new Blob([JSON.stringify({ userId: loggedUserId })], {
  //         type: 'application/json',
  //       })
  //     );
  //     formData.append('userProfilePhoto', e.target.files[0]);

  //     modifyProfilePhoto(formData);
  //   } else {
  //     //업로드 취소할 시
  //     setImage(prevImage);
  //     return;
  //   }
  //   //화면에 프로필 사진 표시
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       console.log(reader);
  //       setImgFile(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  useEffect(() => {
    getUserProfileImg();
  });

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        <section>
          <header>
            프로필 수정
            <button className={cx('close')} onClick={close}>
              &times;
            </button>
          </header>{' '}
          <main>
            <div className={cx('title')}>닉네임 수정</div>
            <div className={cx('input')}>
              <div className={cx('inputWithBtn')}>
                <Input
                  id="nickname"
                  value={nickname}
                  type="text"
                  placeholder={getLoggedUserNickname()}
                  disabled={nicknameConfirm ? true : false}
                  onChange={handleInput}
                />
                <div className={cx('inputBtn')}>
                  <Button
                    type="button"
                    color="alternate"
                    onClick={handleNicknameCheck}
                    disabled={nicknameCheck ? false : true}
                  >
                    중복 검사
                  </Button>
                </div>
              </div>
              {nicknameConfirm ? (
                <p className={cx('validMsg')}>{nicknameMsg}</p>
              ) : (
                <p className={cx('invalidMsg')}>{nicknameMsg}</p>
              )}
            </div>
            <div className={cx('title')}>프로필 사진 변경</div>
            <div className={cx('avatar')}>
              <Avatar
                size="large"
                // onClick={() => fileInput.current.click()}
                src={userProfileImg}
              />
              {/* <input
                type="file"
                style={{ display: 'none' }}
                accept="image/jpg,impge/png,image/jpeg"
                name="userProfilePhoto"
                onChange={onChange}
                ref={fileInput}
              /> */}
            </div>
          </main>
          <footer>
            <Button color="secondary" size="small" onClick={close}>
              프로필 수정하기
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ProfileModal;
