import React from 'react';
import styles from './Span.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TextColor = 'black' | 'yellow' | 'gray' | 'orange';

type TextType = {
  children: string;
  color?: TextColor;
};

const Span = ({ color = 'black', children }: TextType) => {
  return <span className={cx(`text-${color}`)}>{children}</span>;
};

export default Span;
