import P from '../Typography/P/P';
import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';
const cx = classNames.bind(styles);

type CheckboxType = {
  children: string;
  selected: boolean;
  onChange: (...args: any[]) => void;
};

const Checkbox = ({ children, selected, onChange }: CheckboxType) => {
  return (
    <div className={cx('checkbox-form')}>
      <input
        className={cx('checkbox')}
        type="checkbox"
        checked={selected}
        onChange={onChange}
      />
      <P>{children}</P>
    </div>
  );
};

export default Checkbox;
