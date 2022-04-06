import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DonationHistory.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import Selectbox from 'assets/theme/Selectbox/Selectbox';
import { ReactComponent as DollarIcon } from 'assets/images/icon/dollar.svg';
import DonationHistoryListItem from 'components/DonationHistoryListItem/DonationHistoryListItem';
import {
  allFundraiserMyDonationData,
  donate,
} from 'services/blockchain/SsfApi';
import { getWalletAccount } from 'utils/walletAddress';
import { fToNow } from 'utils/formatTime';
import { DonationTransactionType } from 'types/TransactionTypes';
import { getUserNFTIdList } from 'services/blockchain/NftApi';
import H2 from 'assets/theme/Typography/H2/H2';
import H1 from 'assets/theme/Typography/H1/H1';

const cx = classNames.bind(styles);

// const years = [
//   { value: '1', label: '2022' },
//   { value: '2', label: '2021' },
//   { value: '3', label: '2020' },
// ];
// const category = [
//   { value: '1', label: '참전용사' },
//   { value: '2', label: '희귀질환' },
//   { value: '3', label: '미혼모' },
//   { value: '4', label: '코로나19' },
// ];

// enum RejectionCode {
//   'BEFORE_CONFIRMATION' = '확인 전',
//   'APPROVAL' = '승인',
//   'WRONG_CONTACT_NUM' = '신청자 연락처 확인 불가',
//   'UNQUALIFIED_DEPUTY' = '대리인 자격 부족',
//   'DUPLICATION' = '기존 기부 내역과 중복',
//   'INADEQUATE_PLANNING' = '모금 상세 계획 미흡',
//   'INSUFFICIENT_REASON' = '모금 사유 불충분',
//   'LACK_OF_EVIDENCE' = '증빙자료 부족',
//   'ETC' = '기타',
// }

const DonationHistory = () => {
  const [historyList, setHistoryList] = useState<DonationTransactionType[]>([]);
  const [totalDonationAmount, setTotalDontaionAmount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

  // // TODO DELETE AFTER TEST (응답 포맷 확인용)
  // const testDonate = async () => {
  //   const response = await donate(
  //     '0x6102E9D6767639Fe76Ec3650e0Ba53D9530Fd0EA',
  //     await getWalletAccount(),
  //     1
  //   );
  //   console.log(response);
  // };

  const getUserDonationHistory = async () => {
    const response = await allFundraiserMyDonationData(
      await getWalletAccount()
    );
    console.log(response);
    const list: Array<DonationTransactionType> = [];
    response.forEach((e) => {
      // (완료) API 응답 수정된 것에 따라서 수정
      list.push({
        fromAccount: e[0],
        toAccount: e[1],
        date: e[2],
        value: e[3],
        donationTitle: e[4],
        donationId: e[5],
      });
    });
    console.log(list);
    setHistoryList(list);
  };

  /* 사용자의 총 누적 기부금액 계산 */
  const calcTotalDonationAmount = async () => {
    if (historyList.length > 0) {
      let total = historyList
        .map((item) => Number(item.value))
        .reduce((acc, curr) => acc + curr);
      console.log(total);
      setTotalDontaionAmount(total);
    }
  };

  const getUserDonationCount = async () => {
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // mint('covid', '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    const response = await getUserNFTIdList(await getWalletAccount());
    // console.log(response);
    setDonationCount(response.length);
  };

  useEffect(() => {
    getUserDonationHistory();
    getUserDonationCount();
  }, []);

  useEffect(() => {
    calcTotalDonationAmount();
  }, [historyList]);

  return (
    <div>
      {/* <div className={cx('total_donation')}>
        <H3>총</H3>
        <div className={cx('title')}>
          <H1>{String(donationCount)}</H1>
        </div>
        <H3>번의 기부</H3>
      </div> */}
      <div className={cx('total_donation_amount')}>
        <H4>총 기부액</H4>
        <div className={cx('amount')}>
          <div className={cx('icon')}>
            <DollarIcon />
          </div>
          <H2>{`${totalDonationAmount}  SSF`}</H2>
        </div>
      </div>
      <hr />
      <div className={cx('donation_list')}>
        <div className={cx('selectboxlist')}>
          <div className={cx('title')}>모금 참여 이력</div>

          {/* <div className={cx('selectbox')}>
            <Selectbox options={years} />
          </div>
          <div className={cx('selectbox')}>
            <Selectbox options={category} />
          </div> */}
        </div>
        <div className={cx('row')}>
          <div>
            {historyList
              ? historyList.map((item, idx) => (
                  <div key={idx} className={cx('col-lg-12')}>
                    <DonationHistoryListItem
                      toAccount={item.toAccount}
                      fromAccount={item.fromAccount}
                      date={item.date}
                      value={item.value}
                      donationId={item.donationId}
                      donationTitle={item.donationTitle}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
