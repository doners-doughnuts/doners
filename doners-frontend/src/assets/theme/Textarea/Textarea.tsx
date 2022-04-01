import classNames from 'classnames/bind';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Textarea.module.scss';
const cx = classNames.bind(styles);

type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

type InputType = {
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (ev: TextareaChangeEvent) => void;
};

const Textarea = ({
  onChange,
  placeholder,
  name,
  value,
  disabled,
}: InputType) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [disabled, value]);

  // const handleInputChange = () => {
  //   if (inputRef.current) {
  //     onChange(inputRef.current.value);
  //   }
  // };

  const changeHandler = (ev: TextareaChangeEvent) => {
    setInputValue(ev.target.value);
    onChange && onChange(ev); // optional로 인한 코드
  };

  return (
    <textarea
      className={cx('input-form', { disabled })}
      placeholder={placeholder}
      onChange={changeHandler}
      name={name}
      value={inputValue}
      disabled={disabled}
      ref={inputRef}
    />
  );
};

export default Textarea;
