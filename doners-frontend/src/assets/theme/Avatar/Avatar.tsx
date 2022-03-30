import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import defaultImg from 'assets/images/img-user-default.png';

const cx = classNames.bind(styles);

type AvatarSize = 'default' | 'small' | 'large';

type AvatarType = {
  size?: AvatarSize;
  src?: string;
  onClick?: (...args: any[]) => void;
};

const Avatar = ({
  size = 'default',
  src = defaultImg,
  onClick,
}: AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)}>
      <img src={src} alt="avatar-img" onClick={onClick} />
    </div>
  );
};

export default Avatar;
