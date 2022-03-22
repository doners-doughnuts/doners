import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);


type AvatarSize = "small" | "large";

type AvatarType = {
  size ?: AvatarSize;
  src: string;
}


const Avatar = ({size="large", src}:AvatarType) => {
  return (
    <div className={cx(`avatar-${size}`)}>
      <img src={src} alt="avatar-img"/>
    </div>
  );
};

export default Avatar;