import classNames from 'classnames/bind';
import DashboardCard from 'components/Admin/DashboardCard/DashboardCard';
import styles from './DashboardPanel.module.scss';

const cx = classNames.bind(styles);

type DashboardPanelType = {
  nftCount: string;
  pendingCount: string;
  transactionBalance: string;
};

const DashboardPanel = ({
  nftCount,
  pendingCount,
  transactionBalance,
}: DashboardPanelType) => {
  return (
    <>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')}>
            <DashboardCard
              header="NFT 수량"
              content={nftCount.toString()}
              label="DD"
            />
          </div>
          <div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')}>
            <DashboardCard
              header="신규 기부신청"
              content={pendingCount}
              label="건"
            />
          </div>
          <div className={cx('col-lg-4', 'col-md-4', 'col-sm-4')}>
            <DashboardCard
              header="누적 거래 SSF"
              content={transactionBalance.toString()}
              label="SSF"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPanel;
