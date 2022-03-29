import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MyNFT.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NFTCard from 'components/NFTCard/NFTCard';
import EpilogueCard from 'components/EpilogueCard/EpilogueCard';

const cx = classNames.bind(styles);
const MyNFT = () => {
  return (
    <div>
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg')}>
            <Link to="1">
              <NFTCard />
            </Link>
          </div>
          <div className={cx('col-lg')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg')}>
            <NFTCard />
          </div>
          <div className={cx('col-lg')}>
            <NFTCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyNFT;
