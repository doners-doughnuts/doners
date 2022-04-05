import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FundHistory.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FundingItem from 'components/FundingItem/FundingItem';
import LastFundingItem from 'components/LastFundingItem/LastFundingItem';
import H3 from 'assets/theme/Typography/H3/H3';
import { getUserApplicationList } from 'services/api/UserApi';
import { ApplicationProfileListType } from 'types/ApplicationTypes';

const cx = classNames.bind(styles);

const FundHistory = () => {
  const [applicationList, setApplicationList] = useState<
    ApplicationProfileListType[]
  >([]);

  /* 기부 신청 목록 조회 */
  const getApplicationList = async () => {
    const response = await getUserApplicationList();
    // console.log(response.data.userMyPageDonationHistoryResponseDTOList);
    setApplicationList(response.data.userMyPageDonationHistoryResponseDTOList);
  };

  useEffect(() => {
    getApplicationList();
  }, []);

  return (
    <div>
      {applicationList?.length > 0 ? (
        <div>
          <H3>신청한 모금</H3>
          <FundingItem item={applicationList[0]} />
        </div>
      ) : (
        <div>'진행 중인 기부가 없습니다.'</div>
      )}
      {applicationList?.length > 0 ? (
        <>
          <hr />
          <H3>이전 모금 내역</H3>
          {applicationList?.map((item, idx) => (
            <div key={idx}>
              <LastFundingItem item={applicationList[idx]} />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default FundHistory;
