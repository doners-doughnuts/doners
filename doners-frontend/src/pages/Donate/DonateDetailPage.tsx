import DonateInfo from 'containers/DonatePage/DonateDetailPage/DonateInfo/DonateInfo';
import styles from './DonateDetailPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DonateDetailPage = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-6')}>
          <DonateInfo />
        </div>
        <div className={cx('col-lg-6')}>
          <DonateInfo />
        </div>
        <div className={cx('col-lg-6')}>
          <DonateInfo />
        </div>
        <div className={cx('col-lg-6')}>
          <DonateInfo />
        </div>
        <div className={cx('col-lg-6')}>
          <DonateInfo />
        </div>
      </div>
    </section>
  );
};

export default DonateDetailPage;
