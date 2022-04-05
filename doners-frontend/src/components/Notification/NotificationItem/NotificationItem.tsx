import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { readNotification } from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

type NotificationItemProps = {
  item: NotificationItemType;
};

const NotificationItem = ({ item }: NotificationItemProps) => {
  const [isRead, setIsRead] = useState(false);
  // const [notification, setNotification] = useState<NotificationItemType>();
  const navigate = useNavigate();

  const handleClick = async () => {
    await readNotification(item.notificationId);
    navigate(`/fundraisings/${item.donationId}`);
  };

  return (
    <>
      <div className={cx('item')} onClick={handleClick}>
        <div className={cx('item-date')}>{item.createTime}</div>
        {item.description}
        <div className={cx('item-label')}>
          {item.notificationIsRead ? '읽음' : '안읽음'}
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
