import styles from './H2.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange' | 'red';

type TextType = {
  children: string;
  color?: TextColor;
};

const H2 = ({ color = 'black', children }: TextType) => {
  return <h2 className={cx(`text-${color}`)}>{children}</h2>;
};

export default H2;
