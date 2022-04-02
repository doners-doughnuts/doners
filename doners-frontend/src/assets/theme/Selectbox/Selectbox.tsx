import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './Selectbox.module.scss';
import Select from 'react-select';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

// type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type selectBoxType = {
  options: {
    value: string;
    label: string;
  }[];
  onChange?: (...args: any[]) => void;
  value?: string;
};

const Selectbox = ({ options, onChange, value }: selectBoxType) => {
  return (
    <div className={cx('box')}>
      <Select options={options} defaultValue={options[0]} onChange={onChange} />
    </div>
  );
};

export default Selectbox;
