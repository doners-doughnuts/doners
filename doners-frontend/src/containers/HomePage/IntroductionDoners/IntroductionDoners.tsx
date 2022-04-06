import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './IntroductionDoners.module.scss';
import P from 'assets/theme/Typography/P/P';
import character from 'assets/images/landing/coincoalescence.png';
import { cs } from 'date-fns/locale';
import H1 from 'assets/theme/Typography/H1/H1';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles);
const IntroductionDoners = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className={`${styles.Services} ${styles.section}`}>
      <div className={`${styles.container} ${styles['container-default']}`}>
        <div className={cx('contents')}>
          <div className={cx('contentstext')}>
            <H1>Why Doners?</H1>
            <div data-aos="fade-right" className={cx('textbox')}>
              <div className={cx('service')}>
                <P>1. METAMASK를 이용한 손쉬운 기부</P>
                <P>2. DONERS만의 특색있는 NFT</P>
                <P>3. 재단? NO! 개인이 직접 기부를 신청</P>
                <P>4. DONERS와 다양한 제휴기업 혜택</P>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" className={cx('img')}>
            <img src={character} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionDoners;
