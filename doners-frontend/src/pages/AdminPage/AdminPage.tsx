import styles from '../page.module.scss';
import classNames from 'classnames/bind';
import TransactionList from 'containers/Admin/TransactionList/TransactionList';
import DashboardPanel from 'containers/Admin/DashboardPanel/DashboardPanel';
import { useEffect, useState } from 'react';
import { getPendingApplicationList } from 'services/api/AdminApi';
import {
  getMintedNFTCount,
  getTotalNFTCount,
} from 'services/blockchain/NftApi';
import ApplicationList from 'containers/Admin/ApplicationList/ApplicationList';
import { TransactionListItemType } from 'types/TransactionTypes';
import { allFundraiserData, allWithdrawData } from 'services/blockchain/SsfApi';

const cx = classNames.bind(styles);

// type 정의
export type ApplicationListItemType = {
  item: {
    donationId: string;
    thumbnail: string;
    title: string;
    beneficiaryName: string;
    targetAmount: number;
  };
};

const AdminPage = () => {
  const [nftCount, setNftCount] = useState('0/0');
  const [pendingCount, setPendingCount] = useState('0');
  const [transactionBalance, setTransactionBalance] = useState('0');

  // const [applicationList, setApplicationList] = useState([]);
  const [applicationList, setApplicationList] = useState<
    ApplicationListItemType[]
  >([]);

  const [transactionList, setTransactionList] = useState<
    TransactionListItemType[]
  >([]);

  const getNFTCount = async () => {
    const mintedCount = await getMintedNFTCount();
    const totalCount = await getTotalNFTCount();

    setNftCount(mintedCount + '/' + totalCount);
  };

  const getPendingList = async () => {
    const { donationGetListResponseDTOList } =
      await getPendingApplicationList();
    setApplicationList(donationGetListResponseDTOList);

    setPendingCount(donationGetListResponseDTOList.length);
  };

  const getTransactionList = async () => {
    // TODO
    let response = await allFundraiserData();
    let totalBalance: number = 0;
    response.forEach((e) => (totalBalance += Number(e.value)));

    response.push(await allWithdrawData());

    //(임시)
    // const response: TransactionListItemType[] = [];
    // 1. 각각
    // 2. 첫번쨰목록 -> 두번째목록 append
    // 3. .
    // 4. 정렬을 프론트에서

    setTransactionList(response);

    setTransactionBalance(totalBalance.toString());
  };

  useEffect(() => {
    getNFTCount();

    getPendingList();
    getTransactionList();
  }, []);

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('page-title', 'col-lg-6', 'col-md-6', 'col-sm-4')}>
          Dashboard
        </div>
        <DashboardPanel
          nftCount={nftCount}
          pendingCount={pendingCount}
          transactionBalance={transactionBalance}
        />
        <div className={cx('col-lg-6', 'col-md-6', 'col-sm-4')}>
          <ApplicationList applicationList={applicationList} />
        </div>
        <div className={cx('col-lg-6', 'col-md-6', 'col-sm-4')}>
          <TransactionList transactionList={transactionList} />
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
