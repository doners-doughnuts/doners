import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FundHistory.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FundingItem from 'components/FundingItem/FundingItem';
import LastFundingItem from 'components/LastFundingItem/LastFundingItem';
import H3 from 'assets/theme/Typography/H3/H3';

const cx = classNames.bind(styles);
const FundHistory = () => {
  return (
    <div>
      <div>
        <H3>신청한 모금</H3>
        <FundingItem />
      </div>
      <hr />
      <div>
        <H3>이전 모금 내역</H3>
        <div>
          <LastFundingItem />
        </div>
        <div>
          <LastFundingItem />
        </div>
      </div>
    </div>
  );
};

export default FundHistory;
