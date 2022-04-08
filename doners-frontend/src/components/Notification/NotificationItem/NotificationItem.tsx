import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import { readNotification } from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import { getLoggedUserNickname } from 'utils/loggedUser';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

type NotificationItemProps = {
  item: NotificationItemType;
  triggerRefresh: any;
};

const NotificationItem = ({ item, triggerRefresh }: NotificationItemProps) => {
  // const [isRead, setIsRead] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await readNotification(item.notificationId);
    triggerRefresh();
    navigate(`/profile/fundhistory/${getLoggedUserNickname()}`);
  };

  return (
    <>
      <div
        className={cx('item', {
          'notification-new': !item.read,
        })}
        onClick={handleClick}
      >
        <div className={cx('item-content')}>
          <div className={cx('item-date')}>{item.createTime}</div>
          <div className={cx('item-description')}>{item.description}</div>
        </div>
        <div className={cx('item-label')}>{item.read ? '읽음' : 'NEW'}</div>
      </div>
    </>
  );
};

export default NotificationItem;
