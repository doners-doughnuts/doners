import classNames from 'classnames/bind';
import styles from './ImgButton.module.scss';
const cx = classNames.bind(styles);


type ButtonType = {
  shadow ?: boolean;
  active ?: boolean;
  src: string;
  onClick?: (...args: any[]) => void;
}

const ImgButton = ({shadow, active, src, onClick}:ButtonType) => {
  return (
    <button onClick={onClick} className={cx("btn-img", {shadow, active}) }>
      <img src={src} alt="button" />
    </button>
  );
};

export default ImgButton;