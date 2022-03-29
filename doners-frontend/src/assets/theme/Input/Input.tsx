import classNames from 'classnames/bind';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type InputType = {
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (ev: InputChangeEvent) => void;
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
  id,
}: InputType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // const handleInputChange = () => {
  //   if (inputRef.current) {
  //     onChange(inputRef.current.value);
  //   }
  // };

  const changeHandler = (ev: InputChangeEvent) => {
    setInputValue(ev.target.value);
    onChange && onChange(ev); // optional로 인한 코드
  };

  return (
    <input
      className={cx('input-form', { error, success })}
      id={id}
      placeholder={placeholder}
      onChange={changeHandler}
      type={type}
      name={name}
      value={inputValue}
      disabled={disabled}
      ref={inputRef}
    />
  );
};

export default Input;
