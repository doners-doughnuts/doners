import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getNotificationList } from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import { ReactComponent as CommentIcon } from 'assets/images/icon/comment.svg';

import styles from './NotificationsPopover.module.scss';

const cx = classNames.bind(styles);

const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItemType[]>(
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    // 읽을 알림의 id 리스트
    // const readList =
  };

  const getUserNotificationList = async () => {
    const response = await getNotificationList();

    // TODO
    setNotifications(response.data);
  };

  useEffect(() => {
    getUserNotificationList();
  }, []);

  return <></>;
};

export default NotificationsPopover;
