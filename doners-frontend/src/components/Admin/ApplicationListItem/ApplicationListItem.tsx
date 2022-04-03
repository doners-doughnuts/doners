import Avatar from 'assets/theme/Avatar/Avatar';
import Tag from 'assets/theme/Tag/Tag';
import H2 from 'assets/theme/Typography/H2/H2';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import ApprovalModal from 'containers/Admin/ApprovalModal/ApprovalModal';
import { ApplicationListItemType } from 'pages/AdminPage/AdminPage';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './ApplicationListItem.module.scss';

const cx = classNames.bind(styles);

const ApplicationListItem = (item: any) => {
  const [status, setStatus] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { donationId, thumbnail, title, beneficiaryName, targetAmount } =
    item.item;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={cx('item')} onClick={handleOpenModal}>
        <span className={cx('item-avatar')}>
          <Avatar src={thumbnail} />
        </span>
        <span className={cx('item-content')}>
          <div>{`신청자: ${beneficiaryName}`}</div>
          <b>{title}</b>
        </span>
        <span className={cx('status')}>
          {status ? (
            <Tag color="green">승인 대기중</Tag>
          ) : (
            <Tag color="black">처리 완료</Tag>
          )}
        </span>
      </div>
      <ApprovalModal
        open={openModal}
        onClose={handleOnClose}
        setStatus={setStatus}
        donation={item.item}
      />
    </>
  );
};

export default ApplicationListItem;
