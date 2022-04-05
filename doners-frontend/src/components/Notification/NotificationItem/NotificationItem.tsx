import classNames from 'classnames/bind';
import { useState } from 'react';
import { NotificationItemType } from 'types/NotificationTypes';
import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

type NotificationItemProps = {
  item: NotificationItemType;
};

const NotificationItem = ({ item }: NotificationItemProps) => {
  // const {} = props;
  const [isRead, setIsRead] = useState(false);
  const [notification, setNotification] = useState<NotificationItemType>();

  return <>{item}</>;
};

export default NotificationItem;
