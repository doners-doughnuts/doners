import { type } from '@testing-library/user-event/dist/type';
import Button from 'assets/theme/Button/Button';
import Checkbox from 'assets/theme/Checkbox/Checkbox';
import classNames from 'classnames/bind';
import Input from 'assets/theme/Input/Input';
import styles from './UserInfoForm.module.scss';
import React, { useState } from 'react';

interface InfoProps {
  setApplyStep: (applyStep: number) => void;
  setPhone: (phone: string) => void;
  setIsdeputy: (isdeputy: boolean) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRelationshipFile: (relationshipFile: string) => void;
}
const cx = classNames.bind(styles);
const UserInfoForm = ({
  setApplyStep,
  setPhone,
  setIsdeputy,
  setName,
  setEmail,
  setRelationshipFile,
}: InfoProps) => {
  const [isSelect, setIsSelect] = useState(false);
  const handleCheckbox = () => {
    setIsSelect((prev) => !prev);
  };
  return (
    <div className={cx('containor')}>
      <section className={cx('section1')}>
        <div className={cx('header')}>
          <div className={cx('title')}>본인정보 확인</div>
          <div className={cx('sub-title')}>
            기부 신청자(본인/대리인)의 정보가 필요합니다.
          </div>
          <div className={cx('sub-title')}>
            연락 가능한 전화번호를 입력해주세요.
          </div>
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}> 성명</div>
          <Input />
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>전화번호</div>
          <Input placeholder="전화번호" disabled={isSelect} />
        </div>
        <Checkbox selected={isSelect} onChange={handleCheckbox}>
          모금 대상자의 대리인 입니다.
        </Checkbox>
      </section>
      <section className={cx('section2')}>
        <div className={cx('header')}>
          <div className={cx('title')}>대리인이신가요?</div>
          <div className={cx('title')}>
            <u className={cx('title')}>기부 대상자</u>의 정보를 알려주세요.
          </div>
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>성명</div>
          <Input placeholder="수혜자의 성명" disabled={!isSelect} />
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>전화번호</div>
          <Input placeholder="수혜자의 전화번호" disabled={!isSelect} />{' '}
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>관계증명서 첨부</div>
          <Input placeholder="file" type="file" disabled={!isSelect} />
        </div>
      </section>
      <div className={cx('nextbtn')}>
        <Button color={'alternate'}>다음단계</Button>
      </div>
    </div>
  );
};

export default UserInfoForm;
