import Checkbox from 'assets/theme/Checkbox/Checkbox';
import classNames from 'classnames/bind';
import DonationCard from 'components/DonationCard/DonationCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DonateListSortTab from '../DonateListSortTab/DonateListSortTab';
import styles from './DonateListContents.module.scss';
const cx = classNames.bind(styles);

const DonateListContents = () => {
  const [isSelect, setIsSelect] = useState(false);

  const handleCheckbox = () => {
    setIsSelect((prev) => !prev);
  };
  return (
    <div className={cx('outer-container')}>
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-4')}>
            <Checkbox selected={isSelect} onChange={handleCheckbox}>
              모금 가능한 기부만 보기
            </Checkbox>
          </div>
          <div className={cx('col-lg-8')}>
            <DonateListSortTab />
          </div>
          <div className={cx('col-lg-4')}>
            <Link to={'/fundraisings/1'}>
              <DonationCard />
            </Link>
          </div>
          <div className={cx('col-lg-4')}>
            <DonationCard />
          </div>
          <div className={cx('col-lg-4')}>
            <DonationCard />
          </div>
          <div className={cx('col-lg-4')}>
            <DonationCard />
          </div>
          <div className={cx('col-lg-4')}>
            <DonationCard />
          </div>
          <div className={cx('col-lg-4')}>
            <DonationCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateListContents;
