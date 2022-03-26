// import { BackdropProps } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);

type InputType = {
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (...args: any[]) => void;
};

const Input = ({
  onChange,
  error,
  success,
  placeholder,
  type,
  name,
  value,
  disabled,
}: InputType) => {
  return (
    <input
      className={cx('input-form', { error, success })}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
    />
  );
};

export default Input;
