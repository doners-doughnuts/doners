/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import H5 from 'assets/theme/Typography/H5/H5';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Button from 'assets/theme/Button/Button';
import Logo from 'assets/images/header-logo.svg';
import {
  getLoggedUserInfo,
  getLoggedUserNickname,
  isAdmin,
} from 'utils/loggedUser';
import NotificationsPopover from 'containers/Notification/NotificationsPopover';

const cx = classNames.bind(styles);
const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUserNickname, setLoggedUserNickname] = useState('');
  const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);

  useEffect(() => {
    const sessionStorageUserNickname = getLoggedUserNickname();

    if (sessionStorageUserNickname) {
      setIsLogged(true);
      setLoggedUserNickname(sessionStorageUserNickname);
    }

    // console.log(isAdmin());
    setIsLoggedAdmin(isAdmin());
  }, [getLoggedUserInfo()]);

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('header')}>
            <div className={cx('header-leftside')}>
              <ul className={cx('header-list')}>
                <Link to="/">
                  <li>
                    <H5>서비스 소개</H5>
                  </li>
                </Link>
                <li>
                  <Link to="/apply/main">
                    <H5>기부신청</H5>
                  </Link>
                </li>
                <Link to="/category">
                  <li>
                    <H5>기부하기</H5>
                  </li>
                </Link>
                <Link to="/community">
                  <li>
                    <H5>커뮤니티</H5>
                  </li>
                </Link>
              </ul>
            </div>
            <div className={cx('header-center')}>
              <div className={styles.logo}>
                <Link to="/">
                  <img src={Logo} className={styles.logoImg} alt="logo" />
                </Link>
              </div>
            </div>
            <div className={cx('header-rightside')}>
              <ul className={cx('header-list-rightside')}>
                {/* //TODO 다크모드 OR 언어 (리팩토링)
                <li>
                  <H5>언어</H5>
                </li> */}
                <div className={cx('row')}>
                  {isLogged ? (
                    <>
                      {isLoggedAdmin ? (
                        <Link to="/admin">
                          <li>
                            <H5>관리자 페이지</H5>
                          </li>
                        </Link>
                      ) : null}
                      <li>
                        <NotificationsPopover />
                      </li>
                      <Link to={`/profile/${loggedUserNickname}`}>
                        <Button size="small" fullWidth color={'alternate'}>
                          Profile
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/signup">
                      <Button size="small" fullWidth color={'alternate'}>
                        Join
                      </Button>
                    </Link>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
