import classNames from 'classnames/bind';
import styles from './DonateSSF.module.scss';
import Button from 'assets/theme/Button/Button';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import H4 from 'assets/theme/Typography/H4/H4';
import H5 from 'assets/theme/Typography/H5/H5';
import coin from 'assets/images/landing/ssfcoin.png';
import docs from 'assets/images/landing/docs.png';
import H2 from 'assets/theme/Typography/H2/H2';
import H1 from 'assets/theme/Typography/H1/H1';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const DonateSSF = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <section className={cx('section')}>
        <div className={cx('titlebox')}>
          <H1>Currently on Doners...</H1>
        </div>
        <div className={cx('container')}>
          <div className={cx('left')}>
            <div data-aos="fade-up-right">
              <img src={coin} className={cx('img1')} />
            </div>
            <img src={docs} className={cx('img2')} />
          </div>
          <div className={cx('right')}>
            <div className={cx('text')}>
              <H4>
                희귀질환, 참전용사, 미혼모·부, 코로나19 카테고리에 따라 도움이
                필요한 곳에 직접 SSF로 기부할 수 있습니다.
              </H4>
              <H5>SSF란? SSAFY ERC-20 TOKEN </H5>
            </div>
            <div className={cx('btn')}>
              <Link to="/category"></Link>
              <Button color={'primary'}>Donate</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateSSF;
