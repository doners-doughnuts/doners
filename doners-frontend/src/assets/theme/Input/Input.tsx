import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);

type InputType = {
  error?: boolean;
  success?: boolean;
};

const Input = ({ error, success }: InputType) => {
  return (
    <input
      className={cx('input-form', { error, success })}
      placeholder="hello"
    />
  );
};

export default Input;
