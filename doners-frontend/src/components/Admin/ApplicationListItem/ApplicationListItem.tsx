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

  const { donationId, thumbnail, title, beneficiaryName, targetAmount } =
    item.item;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={cx('item')} onClick={handleOpenModal}>
      <P>{`No.${donationId}`}</P>
      <span className={cx('card-content')}>
        {/* <img src={thumbnail}></img> */}
        <Avatar src={thumbnail} />
        {/* <H2 >{content.toString()}</H2>
        <P>{label}</P> */}
      </span>
      <span></span>
      <div
        className={cx('card-content-label')}
      >{`신청자: ${beneficiaryName}`}</div>
      <div className={cx('card-content-label')}>{title}</div>
      <span className={cx('status')}>
        <Tag color="green">{status ? '승인 대기중' : '처리 완료'}</Tag>
      </span>
      <ApprovalModal
        open={openModal}
        onClose={handleOnClose}
        donation={item.item}
      />
    </div>
  );
};

export default ApplicationListItem;
