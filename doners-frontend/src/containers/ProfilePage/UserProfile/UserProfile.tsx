import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from 'assets/theme/Avatar/Avatar';
import ProfileModal from '../ProfileModal/ProfileModal';
import { getWalletAccount } from 'utils/walletAddress';
import { getUserAddress, getUserProfile } from 'services/api/UserApi';
const cx = classNames.bind(styles);

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const { nickname } = useParams();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getAccountInfo = async () => {
    // TODO 프로필 사용자의 지갑주소로 대체
    if (nickname) {
      // 사용자 지갑 주소
      const response = await getUserAddress(nickname);
      // console.log(response.data.userAccount);
      setWalletAddress(response.data.userAccount);

      // 사용자 프로필 사진 (response.data 추출 방식은 그냥 공부삼아 위와 다르게 해본 것)
      const { data } = await getUserProfile(nickname);
      setProfileImg(data.profileImage);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('profileimage')}>
        <Avatar size="large" src={profileImg} onClick={openModal} />
      </div>
      <div className={cx('myaccount')}>
        TODO: 프로필 사용자의 지갑주소{walletAddress} 닉네임 총n번의기부
      </div>
      <ProfileModal open={modalOpen} close={closeModal} />
      닉네임
    </div>
  );
};
export default UserProfile;
