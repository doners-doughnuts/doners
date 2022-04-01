import classNames from 'classnames/bind';
import DashboardCard from 'components/DashboardCard/DashboardCard';
import { useEffect, useState } from 'react';
import { getPendingApplicationList } from 'services/api/AdminApi';
import { fDate } from 'utils/formatTime';
import styles from './DashboardPanel.module.scss';

const cx = classNames.bind(styles);

// type 정의
type ApplicationListItemType = {

}

type TransactionListItemType = {

}

const DashboardPanel = () => {
  const [nftCount, setNftCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [transactionBalance, setTransactionBalance] = useState(0);

  const [applicationList, setApplicationList] = useState<ApplicationListItemType[]>([]);

  const [transactionList, setTransactionList] = useState<TransactionListItemType[]>([]);

  useEffect(() => {
    getPendingList();

  }, [])

  const getPendingList = async () => {
    // const response = await donation();
    // console.log(response);

    console.log(fDate('2022-04-01T02:00:00.640Z'));
  }
  return (
    <>
      < div className={cx('container')} >
        < div className={cx('row')} >
          < div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')} >
            <DashboardCard header='NFT 수량' content={nftCount} label='NFT(DD)' />
          </div >
          <div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')}>
            <DashboardCard header='신규 기부 진행' content={pendingCount} label='건' />
          </div>
          <div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')}>
            <DashboardCard header='당일 거래 ETH/SSF' content={transactionBalance} label='ETH(SSF)' />
          </div>
        </div>
      </div>
    </>
  )

}

export default DashboardPanel;