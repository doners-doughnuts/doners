import classNames from 'classnames/bind';
import styles from './Category.module.scss';

import covid19 from 'assets/images/img-covid19-category.png';
import rare_diseases from 'assets/images/img-rare-diseases-category.png';
import veteran from 'assets/images/img-veteran-category.png';
import single_mom from 'assets/images/img-single-mom-category.png';
import { Link } from 'react-router-dom';
// import ImgButton from 'assets/theme/ImgButton/ImgButton';

const cx = classNames.bind(styles);

const Category = () => {
  return (
    <div className={cx('category')}>
      <h1>Do-Nation!</h1>
      <Link to="/fundraisings/list?category=1&sort=1">
        <div className={cx('category-item', 'item-1')}>
          <img src={covid19} alt="covid19 category" />
          <div className={cx('category-desc')}>코로나 19 모금으로 바로가기</div>
        </div>
      </Link>
      <Link to="/fundraisings/list?category=2&sort=1">
        <div className={cx('category-item', 'item-2')}>
          <img src={rare_diseases} alt="rare_diseases category" />
          <div className={cx('category-desc')}>희귀질환 모금으로 바로가기</div>
        </div>
      </Link>
      <Link to="/fundraisings/list?category=3&sort=1">
        <div className={cx('category-item', 'item-3')}>
          <img src={veteran} alt="veteran category" />
          <div className={cx('category-desc')}>참전용사 모금으로 바로가기</div>
        </div>
      </Link>
      <Link to="/fundraisings/list?category=4&sort=1">
        <div className={cx('category-item', 'item-4')}>
          <img src={single_mom} alt="single_mom category" />
          <div className={cx('category-desc')}>미혼모/부 모금으로 바로가기</div>
        </div>
      </Link>
      <div className={cx('background')}></div>
      <div className={cx('background-sunshine')}></div>
    </div>
  );
};

export default Category;
