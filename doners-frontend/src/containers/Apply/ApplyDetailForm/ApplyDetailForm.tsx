import Input from 'assets/theme/Input/Input';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ApplyDetailForm.module.scss';
import ReceiptEditor from 'containers/EpilogueEditor/ReceiptEditor/ReceiptEditor';
import { Link, useNavigate } from 'react-router-dom';
import allow from 'assets/images/exchangearrow.png';
import Button from 'assets/theme/Button/Button';
import { postDonation } from 'services/api/Donation';
import { getWalletAccount } from 'utils/walletAddress';

type historyType = {
  epilogueBudgetAmount: string;
  epilogueBudgetPlan: string;
  epilogueBudgetSequence: number;
};

const cx = classNames.bind(styles);
const ApplyDetailForm = ({ setApplyStep, apply, setApply }: any) => {
  const [historyList, setHistoryList] = useState<historyType[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [ssf, setSSF] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAccountInfo();
  }, []);

  let total = historyList
    .map((item) => Number(item.epilogueBudgetAmount))
    .reduce((prev, curr) => prev + curr, 0);

  const handleUploadPlan = (data: any) => {
    setHistoryList((prev) => [...prev, data]);
  };

  const getAccountInfo = async () => {
    // TODO 프로필 사용자의 지갑주소로 대체
    const address = await getWalletAccount();
    setWalletAddress(address);
  };

  const handleDeletePlan = (epilogueBudgetSequence: number) => {
    setHistoryList(
      historyList.filter(
        (history) => history.epilogueBudgetSequence !== epilogueBudgetSequence
      )
    );
  };

  const setValue = async () => {
    const formData = new FormData();
    formData.append('certificate', apply.certificate);
    formData.append('image', apply.image);
    const fileevi = apply.evidence;
    fileevi.forEach((file: string | Blob) => {
      formData.append('evidence', file);
    });

    for (let i = 0; i < apply.evidence.length; i++) {
      formData.append('evidence', apply.evidence[i]);
      // console.log(apply.evidence[i]);
    }
    // formData.append('evidence', apply.evidence);
    //console.log(apply.evidence);
    let result = historyList
      .map(({ epilogueBudgetPlan: plan, epilogueBudgetAmount: amount }) => ({
        plan,
        amount,
      }))
      .map((data, idx) => ({ ...data, sequence: idx }));
    formData.append(
      'donationInfoRequestDTO',
      new Blob(
        [
          JSON.stringify({
            beneficiaryName: apply.beneficiaryName,
            beneficiaryPhone: apply.beneficiaryPhone,
            categoryCode: apply.categoryCode,
            deputy: apply.deputy,
            description: apply.description,
            endDate: apply.endDate,
            budget: result,
            targetAmount: apply.targetAmount,
            title: apply.title,
            phone: apply.phone,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    const response = await postDonation(formData);
    if (response) {
      setApplyStep(3);
    } else {
      navigate('/apply/fail');
    }
  };

  useEffect(() => {
    const ssftrans = total / 4000000;
    const temp1 = ssftrans * 10000;
    const temp2 = Math.ceil(temp1);
    const ssfBalance = Number(temp2 / 10000);
    console.log(ssfBalance);
    setSSF(ssfBalance);
    setApply({ ...apply, targetAmount: ssfBalance, budget: historyList });
    console.log(total);
  }, [total, historyList]);

  return (
    <div className={cx('containor')}>
      <div className={cx('title')}>지갑 주소 확인</div>
      <div className={cx('subtitle')}>
        모금액을 수령하실 지갑의 Account 주소입니다.
      </div>
      <Input
        value={walletAddress}
        placeholder="모금 신청자 계정 지갑 주소(자동입력)"
      />
      <div className={cx('maintitle')}>희망 기부 금액 설정</div>
      <div className={cx('title')}>모금액 활용계획</div>
      <div className={cx('editor')}>
        <ReceiptEditor
          onDelete={handleDeletePlan}
          onChange={handleUploadPlan}
          list={historyList}
        />
      </div>

      <div className={cx('title')}>목표 모금액</div>
      <div className={cx('goal')}>
        <div className={cx('trans')}>
          <Input
            placeholder="KRW"
            value={`${total.toLocaleString()} KRW`}
            disabled={true}
          />
        </div>
        <div className={cx('icon')}>
          <img src={allow} />
        </div>
        <div className={cx('trans')}>
          <Input placeholder={`SSF`} value={`${ssf} SSF`} disabled={true} />
        </div>
      </div>
      <div className={cx('nextbtn')}>
        {apply.budget.length !== 0 ? (
          <Button color={'alternate'} onClick={setValue}>
            완료
          </Button>
        ) : (
          <Button color={'alternate'}>폼을 완성해주세요</Button>
        )}
      </div>
    </div>
  );
};

export default ApplyDetailForm;
