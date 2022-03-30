import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './EpilogueCard.module.scss';
// import src from 'assets/images/character.png';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
const cx = classNames.bind(styles);

const EpilogueCard = ({ data }: any) => {
  function formatDate(value: string) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  }

  return (
    // <div className={cx('col-lg-4')}>
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('user-info')}>
          <Avatar />
          <div className={cx('name')}>{data.epilogueWriter}</div>
        </div>
        <div>
          <Span>{formatDate(data.epilogueCreateTime)}</Span>
        </div>
      </div>
      <div className={cx('title')}>
        <H5>{data.epilogueTitle}</H5>
      </div>
      <div className={cx('img-wrap')}>
        <img
          src={data.epilogueThumbnailImage}
          alt="thumbnail"
          className={cx('thumbnail')}
        />
      </div>
    </div>
    // </div>
  );
};

export default EpilogueCard;
