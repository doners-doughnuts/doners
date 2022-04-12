import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './IntroductionDonate.module.scss';
import discord1 from 'assets/images/img-discord1.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import donateGif from 'assets/images/landing/donate.gif';

const cx = classNames.bind(styles);
const IntroductionDonate = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className={cx('section')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('contents')}>
              <div className={cx('left-content')}>
                <div data-aos="fade-up" className={cx('title')}>
                  <h3>기부</h3>
                </div>
                <div data-aos="fade-up" className={cx('textbox')}>
                  <h2 className={cx('text')}>손쉬운 기부,</h2>
                  <h2 className={cx('text')}>신청부터 수령까지</h2>
                  <h2 className={cx('text')}>간편하게</h2>
                </div>
              </div>

              <div data-aos="fade-left" className={cx('right-content')}>
                <div className={cx('monitor')}>
                  <img src={discord1} alt="monitor" />
                  <div className={cx('image')}>
                    <img src={donateGif} alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={cx('service')}>
                <P>1. METAMASK를 이용한 손쉬운 기부</P>
                <P>2. DONERS만의 특색있는 NFT</P>
                <P>3. 재단? NO! 개인이 직접 기부를 신청</P>
                <P>4. DONERS와 다양한 제휴기업 혜택</P>
              </div> */}
    </section>
  );
};

export default IntroductionDonate;
