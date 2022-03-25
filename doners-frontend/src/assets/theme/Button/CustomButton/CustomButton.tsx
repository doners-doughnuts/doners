import classNames from 'classnames/bind';
import { Component } from 'react';
import styles from './CustomButton.module.scss';
const cx = classNames.bind(styles);

type ButtonType = {
  shadow?: boolean;
  active?: boolean;
  color?: string;
  size?: string;
  src: string;
  children?: string;
  onClick?: (...args: any[]) => void;
};

const CustomButton = ({
  shadow,
  active,
  color = 'white',
  src,
  size = 'large',
  children,
  onClick,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={cx(`btn-${color}`, 'btn-img', `btn-${size}`, {
        active,
        shadow,
      })}
    >
      <img src={src} alt="button" />
      {children}
    </button>
  );
};

export default CustomButton;
