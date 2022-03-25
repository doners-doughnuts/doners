import classNames from 'classnames/bind';
import styles from './Tag.module.scss';
const cx = classNames.bind(styles);


type TagColor = "red" | "yellow" | "green" | "orange" | "black";

type TagType = {
  color : TagColor;
  children : string;
}

const Tag = ({ color, children}:TagType) => {
  return (
    <strong className={cx(`tag-${color}`) }>{children}</strong>
  );
};

export default Tag;