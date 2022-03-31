import Input from 'assets/theme/Input/Input';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './ApplyDetailForm.module.scss';
import ReceiptEditor from 'containers/EpilogueEditor/ReceiptEditor/ReceiptEditor';
import allow from 'assets/images/exchangearrow.png';
import Button from 'assets/theme/Button/Button';
interface DetailProps {
  setApplyStep: (applyStep: number) => void;
  setBudget: (phone: [{ amount: ''; plan: '' }]) => void;
  setAmount: (isdeputy: number) => void;
}

const cx = classNames.bind(styles);
const ApplyDetailForm = ({
  setApplyStep,
  setBudget,
  setAmount,
}: DetailProps) => {
  return (
    <div className={cx('containor')}>
      <div className={cx('title')}>지갑 주소 확인</div>
      <div className={cx('subtitle')}>
        모금액을 수령하실 지갑의 Account 주소입니다.
      </div>
      <Input placeholder="모금 신청자 계정 지갑 주소" />
      <div className={cx('maintitle')}>희망 기부 금액 설정</div>
      <div className={cx('title')}>모금액 활용계획</div>
      <div className={cx('editor')}>
        <ReceiptEditor />
      </div>

      <div className={cx('title')}>목표 모금액</div>
      <div className={cx('goal')}>
        <div className={cx('trans')}>
          <Input placeholder="KRW" />
        </div>
        <div className={cx('icon')}>
          <img src={allow} />
        </div>
        <div className={cx('trans')}>
          <Input placeholder="SSF" />
        </div>
      </div>
      <div className={cx('nextbtn')}>
        <Button color={'alternate'}>완료</Button>
      </div>
    </div>
  );
};

export default ApplyDetailForm;
