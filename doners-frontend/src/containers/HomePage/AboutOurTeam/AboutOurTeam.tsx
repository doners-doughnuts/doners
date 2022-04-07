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
import Tag from 'assets/theme/Tag/Tag';
const cx = classNames.bind(styles);

const AboutOurTeam = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <section className={cx('About', 'section')}>
        <H1>About our Team</H1>
        <div className={cx('teammate1', 'team-character')}>
          <img data-aos="zoom-out" src={sunmin} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>FE</Tag>
            <div className={cx('name')}>이선민</div>
            <div className={cx('id')}>@sunmin7</div>
          </div>
        </div>
        <div className={cx('teammate2', 'team-character')}>
          <img data-aos="zoom-out" src={minsu} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>FE</Tag>
            <div className={cx('name')}>송민수</div>
            <div className={cx('id')}>@thdalstn6352</div>
          </div>
        </div>
        <div className={cx('teammate3', 'team-character')}>
          <img data-aos="zoom-out" src={jiwu} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>FE, BlockChain</Tag>
            <div className={cx('name')}>신지우</div>
            <div className={cx('id')}>@ziu974</div>
          </div>
        </div>
        <div className={cx('teammate4', 'team-character')}>
          <img data-aos="zoom-out" src={kibum} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>BE</Tag>
            <div className={cx('name')}>박기범</div>
            <div className={cx('id')}>@kibum414</div>
          </div>
        </div>
        <div className={cx('teammate5', 'team-character')}>
          <img data-aos="zoom-out" src={changhyeon} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>Leader, BE</Tag>

            <div className={cx('name')}>손창현</div>
            <div className={cx('id')}>@gganzii1215</div>
          </div>
        </div>
        <div className={cx('teammate6', 'team-character')}>
          <img data-aos="zoom-out" src={hongjin} alt="character" />
          <div className={cx('desc')}>
            <Tag color={'black'}>BE, BlockChain</Tag>
            <div className={cx('name')}>정홍진</div>
            <div className={cx('id')}>@mistake9518</div>
          </div>
        </div>

        <div className={cx('background')}></div>
        <div>
          <span className={cx('teamName')}>든킨</span>
        </div>
      </section>
    </div>
  );
};

export default AboutOurTeam;
