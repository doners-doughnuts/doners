import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Discord.module.scss';
import discord1 from 'assets/images/img-discord1.png';
import discord2 from 'assets/images/img-discord2.png';
import character from 'assets/images/character-farmer.png';
import logo from 'assets/images/discord_logo2.png';
import H1 from 'assets/theme/Typography/H1/H1';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import Button from 'assets/theme/Button/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles);
const Discord = () => {
  const moveDiscord = () => {
    location.href = 'https://discord.gg/hDsjhMw2';
  };
  useEffect(() => {
    AOS.init();
    setTimeout(function () {
      AOS.refresh();
    }, 500);
  }, []);
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <H1>DONERS 디스코드 커뮤니티</H1>
      </div>

      <div data-aos="fade-up" className={cx('section1')}>
        <div className={cx('img')}>
          <img src={discord1} />
        </div>
        <div className={cx('contents')}>
          <H3>DONERS 만의 커뮤니티를 즐겨보세요! </H3>
          <div>
            인증된 회원만 사용할 수 있는 DONERS 디스코드 채널에서 다양한 소식을
            전달 받을 수 있습니다.
          </div>
        </div>
      </div>

      <div data-aos="fade-up" className={cx('section2')}>
        <div className={cx('contents')}>
          <H3>DONERS 에 대해 알고 싶어요! </H3>
          <div>
            디스코드 채널을 통해 실시간으로 운영진들이 안내해드리고, DONERS의
            NFT에 대한 정보들을 받을 수 있습니다.
          </div>
        </div>
        <div data-aos="fade-up" className={cx('img')}>
          <img src={discord2} />
        </div>
      </div>

      <div data-aos="fade-up" className={cx('section3')}>
        <div className={cx('logo')}>
          <img src={logo} />
        </div>
        <H2>Join Our Server</H2>
        <Button onClick={moveDiscord} color={'discord'}>
          DISCORD
        </Button>

        <div className={cx('background')}></div>
      </div>
    </div>
  );
};
export default Discord;
