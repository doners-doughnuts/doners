import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);


type ButtonSize = "small" | "large";
type ButtonColor = "primary" | "secondary" | "alternate";

type ButtonType = {
  size ?: ButtonSize;
  color : ButtonColor;
  fullWidth ?: boolean;
  shadow ?: boolean;
  children : string;
  onClick?: (...args: any[]) => void;
}

const Button = ({size="large", color, fullWidth=false, shadow=false, onClick, children}:ButtonType) => {
  return (
    <button onClick={onClick} className={cx(`btn-${color}`, `btn-${size}`, {fullWidth, shadow}) }>{children}</button>
  );
};

export default Button;