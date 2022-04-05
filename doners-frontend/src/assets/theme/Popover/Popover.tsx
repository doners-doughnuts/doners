import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

type PopoverType = {
  open: boolean;
  onClose: any;
  // anchorEl: any;
};

const Popover = ({ open, onClose }: PopoverType) => {
  const [ooo, setOO] = useState(false);
  const popup = document.getElementsByClassName('.popup');
  function showPopup() {
    // if (popup) popup.classList.add('open');
    setOO(true);
  }
  function hidePopup() {
    // if (popup) popup.classList.remove('open');
    setOO(false);
  }

  // useEffect(() => {
  //   const popup = document.querySelector('.popup');
  // }, []);
  return (
    <>
      <button onClick={() => showPopup()}>알림열기</button>
      <div className={cx('popup', ooo ? 'open' : null)}>
        <div className={cx('blocker')} onClick={() => hidePopup()}></div>
        <div className={cx('contents')}>This is popup</div>
      </div>
    </>
  );
};

export default Popover;
