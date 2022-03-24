import React from 'react';
import styles from './H5.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange';

type TextType = {
  children: string;
  color?: TextColor;
};

const H5 = ({ color = 'black', children }: TextType) => {
  return <h5 className={cx(`text-${color}`)}>{children}</h5>;
};

export default H5;
