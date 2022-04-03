import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NFTDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Span from 'assets/theme/Typography/Span/Span';
import H4 from 'assets/theme/Typography/H4/H4';
import H3 from 'assets/theme/Typography/H3/H3';
import tempimg from 'assets/images/character-coin-red.png';
const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  // user: string;
};
const NFTDetail = (props: { open?: any; close?: any }) => {
  const { open, close } = props;
  const [target, setTarget] = useState(3.89);
  const [totalpeople, setTotalpeople] = useState(234);
  const [current, setCurrent] = useState(1.0);

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        <section>
          <header>
            상세보기
            <button className={cx('close')} onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className={cx('container')}>
              <div className={cx('NFTImg')}>
                <div className={cx('img')}>
                  <div className={cx('img-wrap')}>
                    {/* <img src={metadata.image} alt="" /> */}
                  </div>
                </div>
              </div>
              <div className={cx('explanation')}>
                <div className={cx('col')}>
                  <div className={cx('row-title')}>Contract address</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-title')}>Token ID</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-title')}>Token Standards</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-title')}>Blockchain</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-title')}>Metadata</div>
                </div>
              </div>
              <div className={cx('explanation')}>
                <div className={cx('col')}>
                  <div className={cx('row-content')}>asdfasdfsadfsad</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-content')}>asdfasdfsadfsad</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-content')}>asdfasdfsadfsad</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-content')}>asdfasdfsadfsad</div>
                </div>
                <div className={cx('col')}>
                  <div className={cx('row-content')}>NN</div>
                </div>
              </div>
            </div>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </div>
  );
};

export default NFTDetail;
