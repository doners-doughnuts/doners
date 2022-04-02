import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './Selectbox.module.scss';
import Select from 'react-select';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

<<<<<<< HEAD
export type selectBoxType = {
  options: {
=======
type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type selectBoxType = {
  option: {
>>>>>>> 9b2e6b39d92be29453f7fc95a921cd2de523fc88
    value: string;
    label: string;
  }[];
  onChange?: (...args: any[]) => void;
  value?: string;
};

<<<<<<< HEAD
const Selectbox = ({ options }: selectBoxType) => {
  return (
    <div className={cx('box')}>
      <Select options={options} defaultValue={options[0]} />
=======
const Selectbox = ({ option, onChange, value }: selectBoxType) => {
  return (
    <div className={cx('box')}>
      <Select options={option} defaultValue={option[0]} onChange={onChange} />
>>>>>>> 9b2e6b39d92be29453f7fc95a921cd2de523fc88
    </div>
  );
};

export default Selectbox;
