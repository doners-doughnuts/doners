import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './DonationCard.module.scss';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
import Tag from 'assets/theme/Tag/Tag';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
const cx = classNames.bind(styles);

const DonationCard = () => {
  return (
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('user-info')}>
          <Avatar />
          <div className={cx('name')}>
            <div>이학성</div>
            <Span>12일 전</Span>
          </div>
        </div>
        <div className={cx('tag')}>
          <Tag color="orange">모금 진행중</Tag>
        </div>
      </div>
      <div className={cx('title')}>
        <H5>코로나로 인해 꿈을 잃었습니다.</H5>
      </div>
      <div className={cx('img-wrap')}></div>
      <div className={cx('progress-bar')}>
        <Progressbar value={80} />
      </div>
      <div className={cx('progress-rate')}>
        <Span color="gray">기부금 달성률 : 87%</Span>
      </div>
    </div>
  );
};

export default DonationCard;
