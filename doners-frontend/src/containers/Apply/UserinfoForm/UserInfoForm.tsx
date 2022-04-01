import { type } from '@testing-library/user-event/dist/type';
import Button from 'assets/theme/Button/Button';
import Checkbox from 'assets/theme/Checkbox/Checkbox';
import classNames from 'classnames/bind';
import Input from 'assets/theme/Input/Input';
import styles from './UserInfoForm.module.scss';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const UserInfoForm = ({ setApplyStep, apply, setApply }: any) => {
  const [isSelect, setIsSelect] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [deputyName, setDeputyName] = useState('');
  const [deputyPhone, setDeputyPhone] = useState('');
  const [file, setFile] = useState('');
  const [deputyDoc, setDeputyDoc] = useState('');

  const handleCheckbox = () => {
    setIsSelect((prev) => !prev);
  };

  const setValue = () => {
    if (isSelect) {
      //대리인일때
      setApply({
        ...apply,
        beneficiaryName: deputyName,
        beneficiaryPhone: deputyPhone,
        deputy: isSelect,
        phone: userPhone,
        certificate: file,
      });
    } else {
      //대리인 아닐때
      setApply({
        ...apply,
        phone: userPhone,
        deputy: isSelect,
      });
    }
    setApplyStep(1);
  };

  const handleUploadFile = async (event: any) => {
    const file = event.target.files;
    setDeputyDoc(file);
    console.log(file);
    setFile(file[0]);
    // const formData = new FormData();
    // formData.append('file', file[0]);
    // console.log(formData);
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
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>전화번호</div>
          <Input
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="전화번호"
          />
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
          <Input
            value={deputyName}
            onChange={(e) => setDeputyName(e.target.value)}
            placeholder="수혜자의 성명"
            disabled={!isSelect}
          />
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>전화번호</div>
          <Input
            value={deputyPhone}
            onChange={(e) => setDeputyPhone(e.target.value)}
            placeholder="수혜자의 전화번호"
            disabled={!isSelect}
          />
        </div>
        <div className={cx('input-data')}>
          <div className={cx('input-title')}>관계증명서 첨부</div>
          <Input
            onChange={handleUploadFile}
            value={''}
            placeholder="file"
            type="file"
            disabled={!isSelect}
          />
        </div>
      </section>
      <div className={cx('nextbtn')}>
        {(!isSelect && userName !== '' && userPhone !== '') ||
        (isSelect &&
          deputyPhone !== '' &&
          deputyName !== '' &&
          deputyDoc !== '') ? (
          <Button onClick={setValue} color={'alternate'}>
            다음 단계
          </Button>
        ) : (
          <Button color={'alternate'}>폼을 작성해주세요</Button>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;
