import React from 'react';
import styles from './H3.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange';

type TextType = {
  children: string;
  color?: TextColor;
};

const H3 = ({ color = 'black', children }: TextType) => {
  return <h3 className={cx(`text-${color}`)}>{children}</h3>;
};

export default H3;
