import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './Selectbox.module.scss';
import Select from 'react-select';
const cx = classNames.bind(styles);

export type selectBoxType = {
  options: {
    value: string;
    label: string;
  }[];
};

const Selectbox = ({ options }: selectBoxType) => {
  return (
    <div className={cx('box')}>
      <Select options={options} defaultValue={options[0]} />
    </div>
  );
};

export default Selectbox;
