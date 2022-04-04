import React from 'react';
import classNames from 'classnames/bind';
import styles from './Discord.module.scss';
import Fade from 'react-reveal/Fade';

const cx = classNames.bind(styles);
const Discord = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('col1')} data-aos="fade-up">
        dddd
      </div>
      <div data-aos="fade-up">dddd</div>
    </div>
  );
};
export default Discord;
