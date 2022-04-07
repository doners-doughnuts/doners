import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileTab.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getLoggedUserNickname } from 'utils/loggedUser';
const cx = classNames.bind(styles);

type TabType = {
  focus: number;
  nickname: string;
};

const ProfileTab = ({ focus, nickname }: TabType) => {
  // useEffect(() => {
  //   // console.log(nickname);
  // }, []);

  return (
    <div>
      <nav className={cx('tab')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <ul className={cx('tab-list')}>
              <li className={cx('tab-list-item', { 'is-active': focus === 1 })}>
                <Link to={`/profile/mynft/${nickname}`}>보유 NFT</Link>
              </li>
              <li
                className={cx('tab-list-item', {
                  'is-active': focus === 2,
                })}
              >
                <Link to={`/profile/donationhistory/${nickname}`}>
                  기부한 내역
                </Link>
              </li>
              {nickname === getLoggedUserNickname() ? (
                <li
                  className={cx('tab-list-item', {
                    'is-active': focus === 3,
                  })}
                >
                  <Link to={`/profile/fundhistory/${nickname}`}>
                    모금신청 관리
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default ProfileTab;
