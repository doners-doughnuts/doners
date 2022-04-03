import classNames from 'classnames/bind';
import styles from './DonateModal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/images/icon/close.svg';
import { ReactComponent as DollarIcon } from 'assets/images/icon/dollar.svg';
import { ReactComponent as AddIcon } from 'assets/images/icon/add.svg';
import { ReactComponent as MinusIcon } from 'assets/images/icon/minus.svg';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import Input from 'assets/theme/Input/Input';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import H2 from 'assets/theme/Typography/H2/H2';
import { useState } from 'react';

const cx = classNames.bind(styles);

type modalType = {
  open: boolean;
  onClose: any;
};
const DonateModal = ({ open, onClose }: modalType) => {
  const [money, setMoney] = useState(0.0023);

  const handleAddClick = () => {
    console.log(money);
    setMoney((prev) => prev + 0.0001);
  };
  const handleMinusClick = () => {
    console.log(money);
    setMoney((prev) => prev - 0.0001);
  };

  return (
    <div className={cx('modal', { openModal: open === true })}>
      {open ? (
        <section className={cx('modalForm')}>
          <div className={cx('header')}>
            <H2>기부하기</H2>
            <div className={cx('close-btn')} onClick={() => onClose()}>
              <CloseIcon />
            </div>
          </div>
          <div>
            <div className={cx('title')}>
              <H3>기부자 지갑 주소</H3>
            </div>
            <div className={cx('wallet-row')}>
              <div className={cx('wallet-account')}>
                <Input value="feasefaerfa" size="large" disabled />
              </div>
              <div className={cx('money')}>
                <div className={cx('icon')}>
                  <DollarIcon />
                </div>
                <H3>23.338 </H3>
                <H4>SSF</H4>
              </div>
            </div>

            <div className={cx('title')}>
              <H3>기부 금액</H3>
              <Span>기부 가능 액수 : 최소 0.0023 SSF ~ 최대 1.0030 SSF</Span>
            </div>
            <div className={cx('donate-form')}>
              <div className={cx('donate-money-wrap')}>
                <div className={cx('donate-money-row')}>
                  <MinusIcon onClick={handleMinusClick} />
                  <div className={cx('donate-money-info')}>
                    <div className={cx('donate-money')}>
                      <H1>{money.toFixed(4)}</H1>
                      <H4>SSF</H4>
                    </div>
                    <div>(약 900,000원)</div>
                  </div>
                  <AddIcon onClick={handleAddClick} />
                </div>
              </div>
              <div className={cx('btn-row')}>
                <div className={cx('donate-btn')}>
                  <Button color="primary" size="large" fullWidth>
                    기부하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default DonateModal;
