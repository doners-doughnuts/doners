import Avatar from 'assets/theme/Avatar/Avatar';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './EpilogueCard.module.scss';
// import src from 'assets/images/character.png';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
const cx = classNames.bind(styles);

const EpilogueCard = () => {
  return (
    // <div className={cx('col-lg-4')}>
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('user-info')}>
          <Avatar />
          <div className={cx('name')}>이학성</div>
        </div>
        <div>
          <Span>12일 전</Span>
        </div>
      </div>
      <div className={cx('title')}>
        <H5>코로나로 인해 꿈을 잃었습니다.</H5>
      </div>
      <div className={cx('img-wrap')}></div>
    </div>
    // </div>
  );
};

export default EpilogueCard;
