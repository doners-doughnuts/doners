import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

type ButtonSize = 'small' | 'default' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'alternate';
type BtnType = 'button' | 'submit' | 'reset';
type ButtonType = {
  size?: ButtonSize;
  color: ButtonColor;
  fullWidth?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  children: string;
  type?: BtnType;
  onChange?: (...args: any[]) => void;
  onClick?: (...args: any[]) => void;
};

const Button = ({
  size = 'default',
  color,
  fullWidth = false,
  shadow = false,
  onClick,
  onChange,
  children,
  type,
  disabled,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      onChange={onChange}
      type={type}
      disabled={disabled}
      className={cx(`btn-${color}`, `btn-${size}`, { fullWidth, shadow })}
    >
      {children}
    </button>
  );
};

export default Button;
