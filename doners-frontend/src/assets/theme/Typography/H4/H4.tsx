import React from 'react';
import styles from './H4.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange';

type TextType = {
  children: string;
  color?: TextColor;
};

const H4 = ({ color = 'black', children }: TextType) => {
  return <h4 className={cx(`text-${color}`)}>{children}</h4>;
};

export default H4;
