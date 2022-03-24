import classNames from 'classnames/bind';
import styles from './EventTab.module.scss';
const cx = classNames.bind(styles);

type TabType = {
  src: string;
  title: string;
};
const EventTab = ({ src, title }: TabType) => {
  return (
    <div className={cx('event-name')}>
      <span className={cx('icon')}>
        <img src={src} alt={title} />
      </span>
      <span>{title}</span>
    </div>
  );
};

export default EventTab;
