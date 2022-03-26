import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import classNames from 'classnames/bind';
import styles from './Epilogue.module.scss';

const cx = classNames.bind(styles);

const Epilogue = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
        <div className={cx('col-lg-4')}>
          <EpilogueCard />
        </div>
      </div>
    </section>
  );
};

export default Epilogue;
