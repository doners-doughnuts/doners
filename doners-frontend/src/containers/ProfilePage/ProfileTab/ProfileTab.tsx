import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileTab.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

type TabType = {
  focus: number;
};

const ProfileTab = ({ focus }: TabType) => {
  const { nickname } = useParams();

  useEffect(() => {
    // console.log(nickname);
  }, []);

  return (
    <div>
      <nav className={cx('lnb')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-8')}>
              <ul className={cx('lnb-list')}>
                <li className={cx('lnb-item', { 'is-active': focus === 1 })}>
                  <Link to={`/profile/mynft/${nickname}`}>보유 NFT</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 2 })}>
                  <Link to={`/profile/donationhistory/${nickname}`}>
                    기부한 내역
                  </Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 3 })}>
                  <Link to={`/profile/fundhistory/${nickname}`}>
                    모금신청 관리
                  </Link>
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
