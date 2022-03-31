import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styles from './ApplyCard.module.scss';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import { signupState } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import ApplyStepper from '../ApplyStepper/ApplyStepper';
import UserInfoForm from '../UserinfoForm/UserInfoForm';
import ApplyDetailForm from '../ApplyDetailForm/ApplyDetailForm';
import ApplyReasonForm from '../ApplyReasonForm/ApplyReasonForm';
import ApplyComplete from '../ApplyComplete/ApplyComplete';

const cx = classNames.bind(styles);
const ApplyCard = () => {
  // 입력 폼 데이터
  const [applySteps, setApplyStep] = useState(0);

  //1단계
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationshipFile, setRelationshipFile] = useState('');
  const [deputy, setIsdeputy] = useState(false);

  //2단계
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [endtime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState([]);

  //3단계
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState([{ amount: '', plan: '' }]);

  const titlelist = ['사용자 정보 기입', '기부 신청 사유', '세부 설정 및 검토'];

  return (
    <section className={cx('container')}>
      <div className={cx('header')}>
        <H3>{titlelist[applySteps]}</H3>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            <div className={cx('stepper')}>
              <div className={cx('stepperimg')}>
                <ApplyStepper applyStep={applySteps} />
              </div>
            </div>

            <header className={cx('article-header')}></header>
            <main className={cx('content')}>
              {(() => {
                switch (applySteps) {
                  case 0:
                    return (
                      <UserInfoForm
                        setApplyStep={setApplyStep}
                        setPhone={setPhone}
                        setIsdeputy={setIsdeputy}
                        setName={setName}
                        setEmail={setEmail}
                        setRelationshipFile={setRelationshipFile}
                      />
                    );
                  case 1:
                    return (
                      <ApplyReasonForm
                        setApplyStep={setApplyStep}
                        setTitle={setTitle}
                        setCategory={setCategory}
                        setEndTime={setEndTime}
                        setDescription={setDescription}
                        setEvidence={setEvidence}
                      />
                    );
                  case 2:
                    return (
                      <ApplyDetailForm
                        setApplyStep={setApplyStep}
                        setBudget={setBudget}
                        setAmount={setAmount}
                      />
                    );
                  case 3:
                    return <ApplyComplete />;
                }
              })()}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyCard;
