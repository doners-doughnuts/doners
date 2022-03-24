import classNames from 'classnames/bind';
import styles from './EventBanner.module.scss';
const cx = classNames.bind(styles);

type BannerType = {
  src: string;
  title: string;
  sub_title: string;
};
const EventBanner = ({ src, title, sub_title }: BannerType) => {
  return (
    <div className={cx('content')}>
      <img src={src} alt={title} />

      <div className={cx('info')}>
        <dl className={cx('infoDetail')}>
          <dt>{title}</dt>
          <dd>{sub_title}</dd>
        </dl>
      </div>
    </div>
  );
};

export default EventBanner;
