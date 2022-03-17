import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header-leftside']}>
        <ul className={styles['header-list']}>
          <Link to="/">
            <li>서비스 소개</li>
          </Link>
          <li>기부신청</li>
          <li>기부하기</li>
          <li>커뮤니티</li>
        </ul>
      </div>
      <div className={styles['header-center']}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} className={styles.logoImg} alt="logo" />
          </Link>
        </div>
      </div>
      <div className={styles['header-rightside']}>
        <ul className={styles['header-list']}>
          <li>언어</li>
          <li>알림</li>
          <li>프로필</li>
          <button>Join</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
