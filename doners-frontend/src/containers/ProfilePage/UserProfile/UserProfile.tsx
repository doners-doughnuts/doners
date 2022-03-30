import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from 'assets/theme/Avatar/Avatar';
import ProfileModal from '../ProfileModal/ProfileModal';
const cx = classNames.bind(styles);

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const { id } = useParams();
  useEffect(() => {}, []);
  return (
    <div className={cx('container')}>
      <div className={cx('profileimage')}>
        <Avatar size="large" onClick={openModal} />
      </div>
      <div className={cx('myaccount')}>
        <image />
        UserAccount
      </div>
      <ProfileModal open={modalOpen} close={closeModal} />
    </div>
  );
};
export default UserProfile;
