import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProfileDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyNFT from '../MyNFT/MyNFT';
import FundHistory from '../FundHistory/FundHistory';
import DonationHistory from '../DonationHistory/DonationHistory';
import ProfileTab from 'containers/ProfilePage/ProfileTab/ProfileTab';
import { getUserAddress } from 'services/api/UserApi';

const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  nickname: string;
  walletAddress: string;
};
const ProfileDetail = ({ focus, nickname, walletAddress }: ProfileType) => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12', 'col-md-12', 'col-sm-4')}>
          <ProfileTab focus={focus} nickname={nickname} />
          <div className={cx('inner-container')}>
            <main className={cx('content')}>
              {focus === 1 ? (
                <MyNFT walletAddress={walletAddress} />
              ) : focus === 2 ? (
                <DonationHistory />
              ) : focus === 3 ? (
                <FundHistory nickname={nickname} />
              ) : null}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetail;
