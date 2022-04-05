import styles from '../page.module.scss';
import classNames from 'classnames/bind';
import H2 from 'assets/theme/Typography/H2/H2';
import TransactionList from 'containers/Admin/TransactionList/TransactionList';
import DashboardPanel from 'containers/Admin/DashboardPanel/DashboardPanel';
import { useEffect, useState } from 'react';
import { getPendingApplicationList } from 'services/api/AdminApi';
import {
  getMintedNFTCount,
  getTotalNFTCount,
} from 'services/blockchain/NftApi';
import ApplicationList from 'containers/Admin/ApplicationList/ApplicationList';
import { cursorTo } from 'readline';
import ApprovalModal from 'containers/Admin/ApprovalModal/ApprovalModal';
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
    console.log(donationGetListResponseDTOList);
    setApplicationList(donationGetListResponseDTOList);

    setPendingCount(donationGetListResponseDTOList.length);
  };

  const getTransactionList = async () => {
    // TODO
    let response = await allFundraiserData();
    console.log('기부내역들: ', response);
    let totalBalance = 0;
    response.forEach((e) => (totalBalance += e.balance));

    response.push(await allWithdrawData());
    console.log('수령내역들: ', response);

    //(임시)
    // const response: TransactionListItemType[] = [];

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
        <div className={cx('col-lg-6', 'col-md-6', 'col-sm-4')}>
          <H2>Dashboard</H2>
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
