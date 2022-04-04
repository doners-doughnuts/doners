import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from 'assets/theme/Avatar/Avatar';
import ProfileModal from '../ProfileModal/ProfileModal';
import { getWalletAccount } from 'utils/walletAddress';
import { getUserAddress, getUserProfile } from 'services/api/UserApi';
import { getUserNFTIdList } from 'services/blockchain/NftApi';
const cx = classNames.bind(styles);

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [donationCount, setDonationCount] = useState(0);

  const { nickname } = useParams();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // TODO 임시. 느려지면 삭제고려.
  const getUserDonationCount = async () => {
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    const response = await getUserNFTIdList(await getWalletAccount());
    // console.log(response);
    setDonationCount(response.length);
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
    getUserDonationCount();
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('profileimage')}>
        <Avatar size="large" src={profileImg} onClick={openModal} />
      </div>
      <div className={cx('profile-info')}>
        <div>닉네임: {nickname}</div>
        <div>지갑주소: {walletAddress}</div>
        <div>
          총<b>{donationCount}</b>번의기부
        </div>
      </div>
      <ProfileModal open={modalOpen} close={closeModal} />
    </div>
  );
};
export default UserProfile;
