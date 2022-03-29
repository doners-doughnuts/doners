import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileTab.module.scss';
import Mypage from 'pages/MyPage/MyPage';
const cx = classNames.bind(styles);

type TabType = {
  focus: number;
  nickname?: string;
};

const ProfileTab = ({ focus, nickname }: TabType) => {
  return (
    <div>
      <nav className={cx('lnb')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-8')}>
              <ul className={cx('lnb-list')}>
                <li className={cx('lnb-item', { 'is-active': focus === 1 })}>
                  <Link to={`/profile/${nickname}/mynft`}>보유 NFT</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 2 })}>
                  <Link to="/profile/donationhistory">기부한 내역</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 3 })}>
                  <Link to="/profile/fundhistory">모금신청 관리</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default ProfileTab;
