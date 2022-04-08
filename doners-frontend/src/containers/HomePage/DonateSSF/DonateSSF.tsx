import classNames from 'classnames/bind';
import styles from './DonateSSF.module.scss';
import Button from 'assets/theme/Button/Button';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import H4 from 'assets/theme/Typography/H4/H4';
import H5 from 'assets/theme/Typography/H5/H5';
import coin from 'assets/images/landing/ssfcoin.png';
import category from 'assets/images/img-category.png';
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
          <div className={cx('row')}>
            <div className={cx('col-lg-12', 'category-wrapper')}>
              <div className={cx('contents')}>
                <div className={cx('left-content')}>
                  <div data-aos="fade-up" className={cx('title')}>
                    <h3>카테고리</h3>
                  </div>
                  <div data-aos="fade-up" className={cx('textbox')}>
                    <h2 className={cx('text')}>도움이 필요한 사람들에게</h2>
                    <h2 className={cx('text')}>따뜻한 손길을</h2>
                  </div>
                  <div data-aos="fade-up" className={cx('sub-textbox')}>
                    <h3 className={cx('sub-text')}>
                      희귀질환, 참전용사, 미혼모·부, 코로나19 카테고리에서
                    </h3>
                    <h3 className={cx('sub-text')}>
                      도움이 필요한 곳에 기부할 수 있습니다.
                    </h3>
                  </div>
                </div>
                <div className={cx('right-content')}>
                  <div data-aos="fade-up-right" className={cx('image')}>
                    <img src={category} alt="category" />
                    <div className={cx('btn')}>
                      <Link to="/category">
                        <Button color={'primary'} fullWidth>
                          기부하러 가기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateSSF;
