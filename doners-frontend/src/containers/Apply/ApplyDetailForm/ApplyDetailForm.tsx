import Input from 'assets/theme/Input/Input';
import React from 'react';
interface DetailProps {
  setApplyStep: (applyStep: number) => void;
  setBudget: (phone: [{ amount: ''; plan: '' }]) => void;
  setAmount: (isdeputy: number) => void;
}

const ApplyDetailForm = ({
  setApplyStep,
  setBudget,
  setAmount,
}: DetailProps) => {
  return (
    <div>
      기부금 설정<div>지갑 주소 확인</div>
      <Input placeholder="모금 신청자 계정 지갑 주소" />
      <div>모금액을 수령하실 지갑의 Account 주소입니다. </div>
      <div>희망 기부 금액 설정</div>
      <div>모금액 활용계획</div>
      <div>목표 모금액</div>
      <Input placeholder="KRW" />
      <Input placeholder="SSF" />
    </div>
  );
};

export default ApplyDetailForm;
