import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CommunityTab.module.scss';
const cx = classNames.bind(styles);

// type focusType = 1 | 2 | 3 | 4;
type TabType = {
  focus: number;
};
const CommunityTab = ({ focus }: TabType) => {
  return (
    <div>
      <nav className={cx('lnb')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-8')}>
              <ul className={cx('lnb-list')}>
                <li className={cx('lnb-item', { 'is-active': focus === 1 })}>
                  <Link to="/community/membership">도너스 멤버쉽</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 2 })}>
                  <Link to="/community/epilogue">감사 후기</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 3 })}>
                  <Link to="/community/board">자유 광장</Link>
                </li>
                <li className={cx('lnb-item', { 'is-active': focus === 4 })}>
                  <Link to="/community/about">디스코드</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CommunityTab;
