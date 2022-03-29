import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './NFTCard.module.scss';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
import Tag from 'assets/theme/Tag/Tag';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
const cx = classNames.bind(styles);

const NFTCard = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('card')}>
        <div className={cx('tag')}>
          <Tag color="black">코로나19</Tag>
        </div>
        <div className={cx('img-wrap')}></div>
      </div>
      <div className={cx('detail')}>
        <div className={cx('nfttitle')}>NFT #109243</div>
        <div className={cx('nftdate')}>2022.03.16</div>
      </div>
    </div>
  );
};

export default NFTCard;
