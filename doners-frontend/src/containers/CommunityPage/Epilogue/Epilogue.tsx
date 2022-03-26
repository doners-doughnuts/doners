import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import classNames from 'classnames/bind';
import styles from './Epilogue.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Epilogue = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-4')}>
          <Link to="1">
            <EpilogueCard />
          </Link>
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
