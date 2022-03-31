import H3 from 'assets/theme/Typography/H3/H3';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { useState } from 'react';
import DonateContentModal from '../DonateContentModal/DonateContentModal';
import styles from './DonateContent.module.scss';

const cx = classNames.bind(styles);

const DonateContent = () => {
  const [openContentModal, setOpenContentModal] = useState(false);
  const [contents, setContents] = useState('');

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae sed donec
        enim pharetra, sed id. Urna odio ac amet fringilla eget elementum lacus.
        Iaculis suscipit purus elit pharetra porttitor convallis dictumst.
        Interdum hendrerit egestas sit ullamcorper. Aliquam facilisis amet, enim
        aenean imperdiet aliquam. Quis urna, eget euismod faucibus purus cursus.
        Cras fusce ipsum adipiscing mi, in odio leo varius fermentum. Parturient
        eu tristique magna integer et tristique. Lorem mauris nisl at lectus
        tortor lorem dolor. Risus, mi quam eget viverra. Viverra vitae mattis
        rhoncus augue sit eu. Penatibus mauris lacus nec, eget facilisis eget.
        Aliquam odio vivamus ut convallis scelerisque. Tempus est ut ac
      </div>
      <div onClick={handleOpenModal} className={cx('open-btn')}>
        <P color="green">더보기</P>
      </div>
      <DonateContentModal
        open={openContentModal}
        onClose={handleOnClose}
        contents={contents}
      />
    </div>
  );
};

export default DonateContent;
