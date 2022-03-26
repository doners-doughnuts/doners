import React from 'react';
import styles from './P.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange' | 'green';

type TextType = {
  children: string;
  color?: TextColor;
};

const P = ({ color = 'black', children }: TextType) => {
  return <p className={cx(`text-${color}`)}>{children}</p>;
};

export default P;
