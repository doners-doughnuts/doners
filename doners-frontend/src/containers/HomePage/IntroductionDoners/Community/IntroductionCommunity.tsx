import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './IntroductionCommunity.module.scss';
import discord1 from 'assets/images/img-discord1.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles);
const IntroductionCommunity = () => {
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
                  <h3>커뮤니티</h3>
                </div>
                <div data-aos="fade-up" className={cx('textbox')}>
                  <h2 className={cx('text')}>다양한 혜택,</h2>
                  <h2 className={cx('text')}>NFT소지자끼리 </h2>
                  <h2 className={cx('text')}>친밀하게</h2>
                </div>
              </div>

              <div data-aos="fade-left" className={cx('right-content')}>
                <div className={cx('monitor')}>
                  <img src={discord1} alt="monitor" />
                  <div className={cx('image')}>
                    <img
                      src="https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22A404/-/raw/develop/readme_assets/community.gif"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionCommunity;
