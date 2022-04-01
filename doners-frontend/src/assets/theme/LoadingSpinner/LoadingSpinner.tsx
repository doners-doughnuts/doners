import { TailSpin } from 'react-loader-spinner';
import classNames from 'classnames/bind';
import styles from './LoadingSpinner.module.scss';
const cx = classNames.bind(styles);

const LoadingSpinner = () => {
  return (
    <div className={cx('loading-spinner')}>
      <TailSpin color="#31a96e" height={80} width={80} />
    </div>
  );
};

export default LoadingSpinner;
