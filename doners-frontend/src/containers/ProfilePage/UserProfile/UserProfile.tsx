import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Avatar from 'assets/theme/Avatar/Avatar';
const cx = classNames.bind(styles);

const UserProfile = () => {
  const { id } = useParams();
  useEffect(() => {}, []);
  return (
    <div className={cx('container')}>
      <div className={cx('profileimage')}>
        <Avatar size="large" />
      </div>
      <div className={cx('myaccount')}>
        <image />
        0x5efA2dABa3237495F3bC2CBbD7f48b192b003270
      </div>
    </div>
  );
};
export default UserProfile;
