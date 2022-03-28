import classNames from 'classnames/bind';
import styles from './DonateListSortTab.module.scss';
import H4 from 'assets/theme/Typography/H4/H4';
const cx = classNames.bind(styles);

// type focusType = 1 | 2 | 3 | 4;
const DonateListSortTab = () => {
  return (
    <div>
      <nav className={cx('lnb')}>
        <ul className={cx('lnb-list')}>
          <li className={cx('lnb-item', 'is-active')}>
            <H4>최신순</H4>
          </li>
          <li className={cx('lnb-item')}>
            <H4>참여 미달순</H4>
          </li>
          <li className={cx('lnb-item')}>
            <H4>마감임박순</H4>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DonateListSortTab;
