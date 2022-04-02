import Button from 'assets/theme/Button/Button';
import classNames from 'classnames/bind';
import styles from './ApplyComplete.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { fDateDash } from 'utils/formatTime';
const cx = classNames.bind(styles);

const ApplyComplete = ({ setApplyStep, apply, setApply }: any) => {
  const date: string = new Date().toString();
  return (
    <div className={cx('container')}>
      <div>
        <div className={cx('title')}>모금이 신청되었습니다!</div>
      </div>
      <div className={cx('contents')}>
        <ul>
          <li>
            - 모금 제목: <b>{apply.title}</b>
          </li>
          <li>
            - 모금 신청일자: <b>{fDateDash(date)}</b>
          </li>
          <li>
            - 모금 마감일자: <b>{apply.endDate}</b>
          </li>
          <li>
            - 목표 모금액: <b>{apply.targetAmount} SSF</b>
          </li>
          <li>
            - 카테고리: <b>{apply.categoryCode}</b>
          </li>
        </ul>
      </div>
      <div>
        신청하신 모금에 대한 상세 정보는 프로필(마이페이지)에서 확인할 수
        있습니다.
      </div>
      <div className={cx('footer-btn')}>
        <Link to={''}>
          <Button color="secondary">마이페이지로 이동</Button>
        </Link>
        <Link to={'/'}>
          <Button color="alternate">홈으로 이동</Button>
        </Link>
      </div>
    </div>
  );
};

export default ApplyComplete;
