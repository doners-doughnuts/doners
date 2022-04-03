import Modal from 'assets/theme/Modal/Modal';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EvidenceType } from 'types/DonationTypes';
import styles from './FileButton.module.scss';

const cx = classNames.bind(styles);

const FileButton = ({ name, url }: EvidenceType) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOnOpen = () => {
    setOpenModal(true);
  };

  const handleOnClose = () => {
    console.log('sdlkfj');
    setOpenModal(false);
  };

  return (
    <>
      <button className={cx('file-button')} onClick={handleOnOpen}>
        {name}
      </button>
      <Modal open={openModal} onClose={handleOnClose} contents={url} />
    </>
  );
};

export default FileButton;
