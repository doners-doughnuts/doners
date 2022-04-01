import classNames from 'classnames/bind';
import H3 from '../Typography/H3/H3';
import styles from './Badge.module.scss';
const cx = classNames.bind(styles);

type BadgeColor = 'red' | 'yellow' | 'green' | 'orange' | 'black';

type BadgeType = {
  color: BadgeColor;
  children: string;
};

const Badge = ({ color, children }: BadgeType) => {
  return (
    <div className={cx(`badge-${color}`)}>
      <H3>{children}</H3>
    </div>
  );
};

export default Badge;
