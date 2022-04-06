import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { readNotification } from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import { getLoggedUserId } from 'utils/loggedUser';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

type NotificationItemProps = {
  item: NotificationItemType;
};

const NotificationItem = ({ item }: NotificationItemProps) => {
  // const [isRead, setIsRead] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    await readNotification(item.notificationId);
    navigate(`/profile/fundhistory${getLoggedUserId()}`);
  };

  return (
    <>
      <div
        className={cx('item', {
          'notification-new': !item.notificationIsRead,
        })}
        onClick={handleClick}
      >
        <div className={cx('item-content')}>
          <div className={cx('item-date')}>{item.createTime}</div>
          <div className={cx('item-description')}>{item.description}</div>
        </div>
        <div className={cx('item-label')}>
          {item.notificationIsRead ? '읽음' : 'NEW'}
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
