import Selectbox, { selectBoxType } from 'assets/theme/Selectbox/Selectbox';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ApprovalModal.module.scss';

const cx = classNames.bind(styles);

enum RejectionCode {
  BEFORE_CONFIRMATION = '확인 전',
  APPROVAL = '승인',
  WRONG_CONTACT_NUM = '신청자 연락처 확인 불가',
  UNQUALIFIED_DEPUTY = '대리인 자격 부족',
  DUPLICATION = '기존 기부 내역과 중복',
  INADEQUATE_PLANNING = '모금 상세 계획 미흡',
  INSUFFICIENT_REASON = '모금 사유 불충분',
  LACK_OF_EVIDENCE = '증빙자료 부족',
  ETC = '기타'
}

const ApprovalModal = () => {
  const [options, setOptions] = useState<selectBoxType>({ options: [] });

  useEffect(() => {
    Object.values(RejectionCode).forEach((value, idx) => {
      options.options.push({ value: idx.toString(), label: value })
    })
    setOptions(options);
  }, []);

  return (
    <div className={cx('card')}>
      <div className={cx('p')}>
        모달
        <Selectbox options={options.options} />
      </div>
    </div>
  )

}

export default ApprovalModal;