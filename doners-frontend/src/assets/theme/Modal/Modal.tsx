import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/images/icon/close.svg';

const cx = classNames.bind(styles);

type ModalType = {
  open: boolean;
  onClose: any;
  contents: any;
};

const Modal = ({ open, onClose, contents }: ModalType) => {
  return (
    <div className={cx('modal', { openModal: open === true })}>
      {open ? (
        <div className={cx('inner-container')}>
          <div className={cx('wrapper')}>
            증빙자료 상세보기
            <div className={cx('close-btn')} onClick={() => onClose()}>
              <CloseIcon />
            </div>
          </div>
          <div className={cx('modal-content')}>
            <embed src={contents} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
