import React from 'react';
import styles from './H1.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange' | 'red';
type TextType = {
  children: string | number;
  color?: TextColor;
};

const H1 = ({ color = 'black', children }: TextType) => {
  return <h1 className={cx(`text-${color}`)}>{children}</h1>;
};

export default H1;
