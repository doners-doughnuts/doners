import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DonationHistory.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import Selectbox from 'assets/theme/Selectbox/Selectbox';
import DonaHistoryListItem from 'components/DonaHistoryListItem/DonaHistoryListItem';

const cx = classNames.bind(styles);

const DonationHistory = () => {
  const years = [
    { value: '1', label: '2022' },
    { value: '2', label: '2021' },
    { value: '3', label: '2020' },
  ];
  const category = [
    { value: '1', label: '참전용사' },
    { value: '2', label: '희귀질환' },
    { value: '3', label: '미혼모' },
    { value: '4', label: '코로나19' },
  ];

  enum RejectionCode {
    'BEFORE_CONFIRMATION' = '확인 전',
    'APPROVAL' = '승인',
    'WRONG_CONTACT_NUM' = '신청자 연락처 확인 불가',
    'UNQUALIFIED_DEPUTY' = '대리인 자격 부족',
    'DUPLICATION' = '기존 기부 내역과 중복',
    'INADEQUATE_PLANNING' = '모금 상세 계획 미흡',
    'INSUFFICIENT_REASON' = '모금 사유 불충분',
    'LACK_OF_EVIDENCE' = '증빙자료 부족',
    'ETC' = '기타',
  }

  return (
    <div>
      <section className={cx('container')}></section>
      <div className={cx('total_donation')}>
        <H3>총 기부액</H3>
        <H4>NNN ETH</H4>
        <H4>(500,000원)</H4>
      </div>
      <hr />
      <div className={cx('donation_list')}>
        {' '}
        <div className={cx('selectboxlist')}>
          <div className={cx('title')}>모금 참여 이력</div>

          <div className={cx('selectbox')}>
            <Selectbox options={years} />
          </div>
          <div className={cx('selectbox')}>
            <Selectbox options={category} />
          </div>
        </div>
        <div className={cx('row')}>
          <div>
            <div className={cx('col-lg-12')}>
              <DonaHistoryListItem />
            </div>
            <div className={cx('col-lg-12')}>
              <DonaHistoryListItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;