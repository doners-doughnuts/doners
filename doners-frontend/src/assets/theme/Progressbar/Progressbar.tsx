import Bar from '@ramonak/react-progress-bar';
import classNames from 'classnames/bind';
import styles from './Progressbar.module.scss';

const cx = classNames.bind(styles);

type ProgressType = {
  value: number;
};
const Progressbar = ({ value }: ProgressType) => {
  return (
    <div>
      <Bar
        customLabel=" "
        bgColor="#31a96e"
        completed={value}
        className={cx('bar')}
        borderRadius="0"
      />
    </div>
  );
};

export default Progressbar;
