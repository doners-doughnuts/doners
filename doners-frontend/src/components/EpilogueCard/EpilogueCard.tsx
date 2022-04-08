import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './EpilogueCard.module.scss';
// import src from 'assets/images/character.png';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
import { fToNow } from 'utils/formatTime';
import { useEffect, useState } from 'react';
import { getUserProfile } from 'services/api/UserApi';
const cx = classNames.bind(styles);

const EpilogueCard = ({ data }: any) => {
  const [imgSrc, setImgSrc] = useState('');

  const getProfileImg = async () => {
    const response = await getUserProfile(data.epilogueWriter);
    if (response) {
      // 이미지등록
      setImgSrc(response.data.profileImage);
    }
  };
  useEffect(() => {
    getProfileImg();
  }, [data]);

  return (
    // <div className={cx('col-lg-4')}>
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('user-info')}>
          <Avatar src={imgSrc} />
          <div className={cx('name')}>{data.epilogueWriter}</div>
        </div>
        <div>
          <Span>{fToNow(data.epilogueCreateTime)}</Span>
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
