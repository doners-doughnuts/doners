import classNames from 'classnames/bind';
import styles from './DonateDetail.module.scss';
import src from 'assets/images/img-covid19-category.png';
import Button from 'assets/theme/Button/Button';
import DonateInfo from '../DonateInfo/DonateInfo';
import DonateContent from '../DonateContent/DonateContent';
import UserInfo from '../UserInfo/UserInfo';
import DonateHistory from '../DonateHistory/DonateHistory';
import DonateFiles from '../DonateFiles/DonateFiles';
import H1 from 'assets/theme/Typography/H1/H1';
import Tag from 'assets/theme/Tag/Tag';
import { useState } from 'react';
import DonateModal from '../DonateModal/DonateModal';

const cx = classNames.bind(styles);

const DonateDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDonateClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('title')}>
              <H1>모금제목</H1>
            </div>
            <div className={cx('category')}>
              <Tag color="black">Category</Tag>
            </div>
          </div>
          <div className={cx('col-lg-6')}>
            <div className={cx('thumbnail')}>
              <img src={src} alt="ex" />
            </div>
            <div className={cx('donate-btn')} onClick={handleDonateClick}>
              <Button color="primary" size="large" fullWidth shadow>
                기부하기
              </Button>
            </div>
            <DonateModal open={isOpen} onClose={handleCloseClick} />
          </div>
          <div className={cx('col-lg-6')}>
            <DonateContent />
          </div>
          <div className={cx('col-lg-6')}>
            <DonateInfo />
          </div>
          <div className={cx('col-lg-6', 'user-info')}>
            <UserInfo />
            <div className={cx('file-form')}>
              <DonateFiles />
            </div>
          </div>
          <div className={cx('col-lg-6')}>
            <DonateHistory />
          </div>
        </div>
      </section>
    </>
  );
};

export default DonateDetail;
