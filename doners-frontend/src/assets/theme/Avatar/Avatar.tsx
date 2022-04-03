import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import defaultimg from 'assets/images/img-donerscoin1.png';
const cx = classNames.bind(styles);

type AvatarSize = 'default' | 'small' | 'large';

type AvatarType = {
  size?: AvatarSize;
  src?: string;
  onClick?: (...args: any[]) => void;
};

const Avatar = ({ size = 'default', src, onClick }: AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)}>
      {src ? (
        <img src={src} alt="avatar-img" onClick={onClick} />
      ) : (
        <img src={defaultimg} onClick={onClick} />
      )}
    </div>
  );
};

export default Avatar;
