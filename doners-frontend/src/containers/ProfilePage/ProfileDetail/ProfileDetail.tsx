import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MyNFT from '../MyNFT/MyNFT';
import FundHistory from '../FundHistory/FundHistory';
import DonationHistory from '../DonationHistory/DonationHistory';
import ProfileTab from 'containers/ProfilePage/Tab/ProfileTab';

const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  // user: string;
};
const ProfileDetail = ({ focus }: ProfileType) => {
  return (
    <div>
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <ProfileTab focus={focus} />
            <div className={cx('inner-container')}>
              <main className={cx('content')}>
                ProfileDetail!{focus}
                {focus === 1 ? (
                  <div>
                    <MyNFT />
                  </div>
                ) : focus === 2 ? (
                  <div>
                    <DonationHistory />
                  </div>
                ) : focus === 3 ? (
                  <div>
                    <FundHistory />
                  </div>
                ) : null}
              </main>
            </div>
          </div>
        </div>
      </section>{' '}
    </div>
  );
};

export default ProfileDetail;
