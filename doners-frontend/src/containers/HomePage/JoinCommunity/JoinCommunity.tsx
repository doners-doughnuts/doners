import classNames from 'classnames/bind';
import styles from './JoinCommunity.module.scss';
import Button from 'assets/theme/Button/Button';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import character from 'assets/images/character-farmer.png';
import H1 from 'assets/theme/Typography/H1/H1';
import P from 'assets/theme/Typography/P/P';
import H4 from 'assets/theme/Typography/H4/H4';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const JoinCommunity = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <section
        className={`${styles.Cummunity} ${styles.section} ${styles['vertical-center']}`}
      >
        <div className={`${styles.container} ${styles['container-default']}`}>
          <div className={cx('innerContainer')}>
            <div data-aos="zoom-in" className={cx('welcome-community-box')}>
              <div>
                <img
                  src={character}
                  alt="character"
                  className={cx('community-character')}
                />
              </div>
              <div className={cx('community-contents')}>
                <div className={cx('community-text')}>
                  <H1>Join Our Community!</H1>
                  <H4>Doners의 다양한 멤버십 혜택과 </H4>
                  <H4>
                    기부에 대한 후기 및 멤버십 게시판을 이용할 수 있습니다!
                  </H4>
                  <H4>지금 바로 커뮤니티에 참여하세요!</H4>
                </div>
                <div className={cx('right-button')}>
                  <Link to="/community">
                    <Button color={'alternate'}>Our Meet</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinCommunity;
