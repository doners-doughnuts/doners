import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './UploadItem.module.scss';
import { ReactComponent as RemoveIcon } from 'assets/images/icon/remove.svg';

const cx = classNames.bind(styles);

const UploadItem = ({ value }: any) => {
  return (
    <div className={cx('history-item')}>
      FILE <P>{value}</P>
      <div className={cx('value')}>
        <div className={cx('icon')}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
