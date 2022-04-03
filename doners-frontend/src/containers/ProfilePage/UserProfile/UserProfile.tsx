import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from 'assets/theme/Avatar/Avatar';
import ProfileModal from '../ProfileModal/ProfileModal';
import { getWalletAccount } from 'utils/walletAddress';
const cx = classNames.bind(styles);

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getAccountInfo = async () => {
    const address = await getWalletAccount();
    setWalletAddress(address);
  };

  const { id } = useParams();

  useEffect(() => {
    getAccountInfo();
  }, []);
  return (
    <div className={cx('container')}>
      <div className={cx('profileimage')}>
        <Avatar size="large" onClick={openModal} />
      </div>
      <div className={cx('myaccount')}>
        <image />
        {walletAddress}
      </div>
      <ProfileModal open={modalOpen} close={closeModal} />
    </div>
  );
};
export default UserProfile;
