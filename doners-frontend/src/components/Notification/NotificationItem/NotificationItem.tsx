import classNames from 'classnames/bind';
import { useState } from 'react';
import { NotificationItemType } from 'types/NotificationTypes';
import styles from './NotificationsPopover.module.scss';

const cx = classNames.bind(styles);

const NotificationItem = () => {
  const [isRead, setIsRead] = useState(false);
  const [notification, setNotification] = useState<NotificationItemType>();

  return <></>;
};

export default NotificationItem;
