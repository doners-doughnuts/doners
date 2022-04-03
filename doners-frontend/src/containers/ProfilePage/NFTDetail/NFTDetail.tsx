import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NFTDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Span from 'assets/theme/Typography/Span/Span';
import H4 from 'assets/theme/Typography/H4/H4';
import H3 from 'assets/theme/Typography/H3/H3';
import tempimg from 'assets/images/character-coin-red.png';
import { NftMetadataType } from 'types/NftTypes';

const cx = classNames.bind(styles);

type ProfileType = {
  focus: number;
  // user: string;
};

const NFTDetail = (props: {
  open?: any;
  close?: any;
  metadata?: NftMetadataType;
}) => {
  const { open, close } = props;

  const [metadata, setMetadata] = useState(props.metadata);

  console.log(metadata);

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
              <div className={cx('row')}>
                <div className={cx('col-lg-3', 'col-md-4', 'col-sm-4')}>
                  <div className={cx('img-wrap')}>
                    <img src={metadata?.image} alt="Your Doughnut!" />
                  </div>
                </div>
                {/* <div className={cx('col-lg-1.5', 'col-md-2', 'col-sm-1')}> */}
                <div className={cx('detail-header')}>
                  <div className={cx('col-lg-1', 'col-md-2', 'col-sm-2')}>
                    <div className={cx('row-title')}>이름</div>
                    <div className={cx('row-title')}>ID</div>
                    <div className={cx('row-title')}>설명</div>
                    <div className={cx('row-title')}>카테고리</div>
                    <div className={cx('row-title')}>발급일자</div>
                    <div className={cx('row-title')}>속성</div>
                    {/* </div> */}
                  </div>
                </div>
                <div className={cx('detail-content')}>
                  <div className={cx('col-lg-3', 'col-md-1', 'col-sm-2')}>
                    <div className={cx('row-content')}>{metadata?.name}</div>
                    <div className={cx('row-content')}>{metadata?.tokenId}</div>
                    <div className={cx('row-content')}>
                      {metadata?.description}
                    </div>
                    <div className={cx('row-content')}>{metadata?.edition}</div>
                    <div className={cx('row-content')}>{metadata?.date}</div>
                    <div className={cx('row-content')}>
                      희귀도:(비공개)
                      {/* {metadata?.attributes.toString()} */}
                    </div>
                  </div>
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
