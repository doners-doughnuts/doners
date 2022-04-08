import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NFTWorks.module.scss';
import P from 'assets/theme/Typography/P/P';
import character from 'assets/images/landing/coincoalescence.png';
import H1 from 'assets/theme/Typography/H1/H1';
import H4 from 'assets/theme/Typography/H4/H4';
import IntroductionNFT from '../IntroductionNFT/IntroductionNFT';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles);
const NFTWorks = () => {
  return (
    <section className={cx('section')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('contents')}>
              <div className={cx('title')}>
                <H1>How it works...</H1>
                <H4 color="gray">
                  기부 후 다양한 조합의 자신만의 NFT를 가질 수 있습니다.
                </H4>
              </div>
              <div>
                <IntroductionNFT />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTWorks;
