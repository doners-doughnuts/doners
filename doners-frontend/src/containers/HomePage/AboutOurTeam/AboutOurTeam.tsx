import classNames from 'classnames/bind';
import styles from './AboutOurTeam.module.scss';
import Button from 'assets/theme/Button/Button';
import { useNavigate } from 'react-router';
import character from 'assets/images/character-angel.png';
import { ToastContainer, toast } from 'react-toastify';
import jiwu from 'assets/images/members/doners_jiwu.png';
import changhyeon from 'assets/images/members/doners_changhyeon.png';
import kibum from 'assets/images/members/doners_kibum.png';
import minsu from 'assets/images/members/doners_minsu.png';
import hongjin from 'assets/images/members/doners_hongjin.png';
import sunmin from 'assets/images/members/doners_sunmin.png';
import H1 from 'assets/theme/Typography/H1/H1';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const cx = classNames.bind(styles);

const AboutOurTeam = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <section className={cx('About', 'section')}>
        <H1>About our Team</H1>
        <div>
          <img
            data-aos="zoom-out"
            src={sunmin}
            alt="character"
            className={cx('teammate1', 'team-character')}
          />
        </div>
        <img
          data-aos="zoom-out"
          src={minsu}
          alt="character"
          className={`${styles.teammate2} ${styles['team-character']}`}
        />
        <img
          data-aos="zoom-out"
          src={jiwu}
          alt="character"
          className={`${styles.teammate3} ${styles['team-character']}`}
        />
        <img
          data-aos="zoom-out"
          src={kibum}
          alt="character"
          className={`${styles.teammate4} ${styles['team-character']}`}
        />
        <img
          data-aos="zoom-out"
          src={changhyeon}
          alt="character"
          className={`${styles.teammate5} ${styles['team-character']}`}
        />
        <img
          data-aos="zoom-out"
          src={hongjin}
          alt="character"
          className={`${styles.teammate6} ${styles['team-character']}`}
        />

        <div className={cx('background')}></div>
        <div>
          <span className={cx('teamName')}>든킨</span>
        </div>
      </section>
    </div>
  );
};

export default AboutOurTeam;
