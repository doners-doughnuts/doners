import { Viewer } from '@toast-ui/react-editor';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { DontationDetailType } from 'types/DonationTypes';
import DonateContentModal from '../DonateContentModal/DonateContentModal';
// import { DonationDetailType } from '../DontateDetail/DonateDetail';
import styles from './DonateContent.module.scss';

const cx = classNames.bind(styles);

type DonateContentProps = {
  data: DontationDetailType;
};
const DonateContent = ({ data }: DonateContentProps) => {
  const [openContentModal, setOpenContentModal] = useState(false);

  const handleOpenModal = () => {
    setOpenContentModal(true);
  };

  const handleOnClose = () => {
    setOpenContentModal(false);
  };
  return (
    <div className={cx('inner-container')}>
      <div className={cx('title')}>
        <H3>모금 신청자의 글</H3>
      </div>
      <div className={cx('content')}>
        <div className={cx('content-detail')}>
          <H4>{data.title}</H4>
          <div onClick={handleOpenModal} className={cx('expand-btn')}>
            <P color="green">더보기</P>
          </div>
        </div>
        {/* {data.description} */}
        {/* <Viewer initialValue={data.description} /> */}
        {/* <P>test</P> */}
      </div>

      <DonateContentModal
        open={openContentModal}
        onClose={handleOnClose}
        contents={data.description}
      />
    </div>
  );
};

export default DonateContent;
