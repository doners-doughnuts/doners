import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
  getNotificationList,
  readNotification,
} from 'services/api/NotificationApi';
import { NotificationItemType } from 'types/NotificationTypes';
import { ReactComponent as NotificationIcon } from 'assets/images/icon/bell.svg';

import styles from './NotificationsPopover.module.scss';
import Popover from 'assets/theme/Popover/Popover';
import H4 from 'assets/theme/Typography/H4/H4';
import NotificationItem from 'components/Notification/NotificationItem/NotificationItem';
import _notificationList from '_mocks_/notificationData';
import { ReactComponent as CheckAllIcon } from 'assets/images/icon/check.svg';

import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

const NotificationsPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [totalUnReadCnt, setTotalUnReadCnt] = useState(0);

  // const [notifications, setNotifications] =
  // useState<NotificationItemType[]>(_notificationList);
  const [notifications, setNotifications] = useState<NotificationItemType[]>(
    []
  );

  // const totalUnReadCnt = notifications.filter(
  //   (item) => !item.read
  // ).length;
  // git setTotalUnReadCnt(cnt);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    // 읽을 알림의 id 리스트
    // TODO 리스트로 읽음 처리하는 api (리팩토링 요청)
    notifications
      .slice(0, totalUnReadCnt)
      .forEach(async (item) => await readNotification(item.notificationId));
    // 알림 목록 갱신(새로고침)
    getUserNotificationList();
  };

  const getUserNotificationList = async () => {
    const response = await getNotificationList();
    console.log('알림 목록: ', response.data);

    // 전체 안 읽은 알림 개수:
    const cnt = response.data.notificationGetListResponseDTOList.filter(
      (item: { read: boolean }) => !item.read
    ).length;
    console.log(cnt);
    setTotalUnReadCnt(cnt);

    // 전처리 후 저장) 알림 목록을 읽음 -> 안읽음 기준으로 정렬
    setNotifications(
      response.data.notificationGetListResponseDTOList.sort(function (
        a: any,
        b: any
      ) {
        return a.read - b.read;
      })
    );
  };

  useEffect(() => {
    getUserNotificationList();
    // notifications.sort(function (a: any, b: any) {
    //   return a.read - b.read;
    // });
  }, []);

  return (
    <>
      <div>
        <div onClick={handleOpen}>
          <NotificationIcon />
          {totalUnReadCnt > 0 ? (
            <div className={cx('badge')}>{totalUnReadCnt}</div>
          ) : null}
        </div>

        {open ? (
          <div className={cx('popover', { open: open })}>
            <div className={cx('blocker')} onClick={handleClose}></div>
            <div className={cx('contents')}>
              <div className={cx('notification-header')}>
                <div className={cx('notification-sub-header')}>
                  <H4>Notifications</H4>총{' '}
                  <span className={cx('notification-unread-count')}>
                    {totalUnReadCnt}
                  </span>{' '}
                  개의 새로운 알림이 있습니다
                </div>
                <div className={cx('notification-read-all')}>
                  {totalUnReadCnt >= 0 && (
                    <div title=" 전체읽음 처리">
                      <button color="secondary" onClick={handleMarkAllAsRead}>
                        <CheckAllIcon />
                        {/* <Icon icon={doneAllFill} width={20} height={20} /> */}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <hr />
              <div className={cx('list')}>
                <div className={cx('list-new')}>
                  <div className={cx('list-header')}>새로운 알림</div>
                  {/* <hr /> */}
                  {notifications
                    .slice(0, totalUnReadCnt)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.notificationId}
                        item={notification}
                        triggerRefresh={getUserNotificationList}
                      />
                    ))}
                </div>

                {/* <hr /> */}
                <div className={cx('list-prev')}>
                  <div className={cx('list-header')}>읽은 알림</div>
                  {/* <hr /> */}
                  {notifications
                    .slice(totalUnReadCnt, notifications.length)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.notificationId}
                        item={notification}
                        triggerRefresh={getUserNotificationList}
                      />
                    ))}
                </div>
                {/* <hr /> */}
              </div>
              <div className={cx('reload-button')}>
                <hr />
                <button onClick={getUserNotificationList}>새로고침</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NotificationsPopover;
