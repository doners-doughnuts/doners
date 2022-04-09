import instance from 'services/axios';

const COMMON = '/notification';

/**
 * 로그인 된 사용자의 알림 목록
 * @returns 알림 목록, NotificationItemType[] 타입
 */
export const getNotificationList = async () => {
  const response = await instance.get(COMMON);
  // console.log(response);
  return response;
};

/**
 * 알림 읽음 처리
 * @param notificationId 읽을 알림의 id
 * @returns  "message": "성공", "statusCode": 200}
 */
export const readNotification = async (notificationId: string) => {
  const response = await instance.patch(COMMON, {
    notificationId,
  });
  return response;
};
