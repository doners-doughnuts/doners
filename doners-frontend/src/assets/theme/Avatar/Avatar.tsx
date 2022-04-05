import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import defaultimg from 'assets/images/img-defaultprofile2.png';
const cx = classNames.bind(styles);

type AvatarSize = 'default' | 'small' | 'large' | 'xlarge';

type AvatarType = {
  size?: AvatarSize;
  src?: string;
  onClick?: (...args: any[]) => void;
};

const Avatar = ({ size = 'default', src, onClick }: AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)} onClick={onClick}>
      {src ? (
        <img src={src} alt="avatar-img" />
      ) : (
        <img src={defaultimg} alt="default" />
      )}
    </div>
  );
};

export default Avatar;
