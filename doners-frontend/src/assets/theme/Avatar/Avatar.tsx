import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarSize = 'default' | 'small' | 'large';

type AvatarType = {
  size?: AvatarSize;
  src?: string;
};

const Avatar = ({ size = 'default', src }: AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)}>
      {src ? <img src={src} alt="avatar-img" /> : null}
    </div>
  );
};

export default Avatar;
