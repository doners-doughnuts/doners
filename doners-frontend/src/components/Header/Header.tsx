import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from 'assets/images/logo.png';

const Header = () => {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);

  function handleScroll() {
    if (ScrollY > 45) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <div
      className={
        ScrollActive
          ? [styles.header, styles.fixed].join(' ')
          : styles['header']
      }
    >
      <div className={styles['header-leftside']}>
        <ul className={styles['header-list']}>
          <Link to="/">
            <li>서비스 소개</li>
          </Link>
          <li>기부신청</li>
          <Link to="/category">
            <li>기부하기</li>
          </Link>
          <Link to="/community">
            <li>커뮤니티</li>
          </Link>
        </ul>
      </div>
      <div className={styles['header-center']}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} className={styles.logoImg} alt="logo" />
          </Link>
        </div>
        <Link to="/">
          <div className={styles.logoTitle}>DONERS</div>
        </Link>
      </div>
      <div className={styles['header-rightside']}>
        <ul className={styles['header-list']}>
          <li>언어</li>
          <li>알림</li>
          <li>프로필</li>
          <Link to="/signup">
            <button
              className={`${styles['alternative-button']} ${styles.button}`}
            >
              Join
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
