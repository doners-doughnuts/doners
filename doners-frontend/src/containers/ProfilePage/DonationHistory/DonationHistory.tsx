import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DonationHistory.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const DonationHistory = () => {
  return (
    <div>
      <div>총 기부액</div>
      <div>ETH</div>
      <div>(500,000원)</div>

      <div>
        <div>모금 참여 이력</div>
      </div>
    </div>
  );
};

export default DonationHistory;
