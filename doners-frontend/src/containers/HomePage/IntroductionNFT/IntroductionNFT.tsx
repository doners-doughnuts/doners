import classNames from 'classnames/bind';
import styles from './IntroductionNFT.module.scss';

import Frosting1 from 'assets/images/NFT/Frosting1.png';
import Decoration1 from 'assets/images/NFT/Decoration1.png';
import Expression1 from 'assets/images/NFT/Expression1.png';

import Frosting2 from 'assets/images/NFT/Frosting2.png';
import Decoration2 from 'assets/images/NFT/Decoration2.png';
import Expression2 from 'assets/images/NFT/Expression4.png';

import Frosting3 from 'assets/images/NFT/Frosting3.png';
import Decoration3 from 'assets/images/NFT/Decoration3.png';
import Expression3 from 'assets/images/NFT/Expression9.png';

import Frosting4 from 'assets/images/NFT/Frosting4.png';
import Decoration4 from 'assets/images/NFT/Decoration4.png';
import Expression4 from 'assets/images/NFT/Expression10.png';

import Frosting5 from 'assets/images/NFT/Frosting5.png';
import Decoration5 from 'assets/images/NFT/Decoration5.png';
import Expression5 from 'assets/images/NFT/Expression11.png';

import Theme1 from 'assets/images/NFT/Theme1.png';
import Theme2 from 'assets/images/NFT/Theme2.png';
import Theme3 from 'assets/images/NFT/Theme3.png';
import Theme4 from 'assets/images/NFT/Theme11.png';
import Theme5 from 'assets/images/NFT/Theme9.png';
import Theme6 from 'assets/images/NFT/Theme6.png';
import Theme7 from 'assets/images/NFT/Theme10.png';
import Theme8 from 'assets/images/NFT/Theme8.png';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

const IntroductionNFT = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className={cx('container-wrap')}>
      {/* <div className={cx('col-lg-2')}> */}
      <div className={cx('nft')}>
        <img className={cx('img')} src={Frosting1} alt="nft" />
        <img className={cx('img')} src={Decoration1} alt="nft" />
        <img className={cx('img')} src={Expression1} alt="nft" />
      </div>
      {/* </div> */}
      {/* <div className={cx('col-lg-2')}> */}
      <div className={cx('nft')}>
        <img className={cx('img')} src={Frosting2} alt="nft" />
        <img className={cx('img')} src={Decoration2} alt="nft" />
        <img className={cx('img')} src={Expression2} alt="nft" />
      </div>
      {/* </div> */}
      {/* <div className={cx('col-lg-2')}> */}
      <div className={cx('nft')}>
        <img className={cx('img')} src={Frosting3} alt="nft" />
        <img className={cx('img')} src={Decoration3} alt="nft" />
        <img className={cx('img')} src={Expression3} alt="nft" />
      </div>
      {/* </div> */}
      {/* <div className={cx('col-lg-2')}> */}
      {/* <div className={cx('nft')}>
        <img className={cx('img')} src={Frosting4} alt="nft" />
        <img className={cx('img')} src={Decoration4} alt="nft" />
        <img className={cx('img')} src={Expression4} alt="nft" />
      </div> */}
      {/* </div> */}
      {/* <div className={cx('col-lg-2')}> */}
      <div className={cx('nft')}>
        <img className={cx('img')} src={Frosting5} alt="nft" />
        <img className={cx('img')} src={Decoration5} alt="nft" />
        <img className={cx('img')} src={Expression5} alt="nft" />
      </div>
      {/* </div> */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        className={cx('theme-container')}
      >
        <div className={cx('theme-wrap')}>
          <img className={cx('theme')} src={Theme1} alt="nft" />
          <img className={cx('theme')} src={Theme2} alt="nft" />
          <img className={cx('theme')} src={Theme3} alt="nft" />
          <img className={cx('theme')} src={Theme4} alt="nft" />
          <img className={cx('theme')} src={Theme5} alt="nft" />
          <img className={cx('theme')} src={Theme6} alt="nft" />
          <img className={cx('theme')} src={Theme7} alt="nft" />
          <img className={cx('theme')} src={Theme8} alt="nft" />
        </div>
      </div>
    </section>
  );
};

export default IntroductionNFT;
