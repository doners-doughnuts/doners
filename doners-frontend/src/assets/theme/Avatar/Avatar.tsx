import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import defaultImg from 'assets/images/img-user-default.png';

const cx = classNames.bind(styles);

type AvatarSize = 'small' | 'large';

type AvatarType = {
  size?: AvatarSize;
  src?: string;
};

const Avatar = ({ size = 'large', src = defaultImg }: AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)}>
      <img src={src} alt="avatar-img" />
    </div>
  );
};

export default Avatar;
