import { Footer, Header } from 'components';
import { Outlet } from 'react-router';
import classNames from 'classnames/bind';
import styles from './ScrollLayout.module.scss';
const cx = classNames.bind(styles);

const ScrollLayout = () => {
  return (
    <div>
      <Header />
      <div className={cx('outlet')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ScrollLayout;
