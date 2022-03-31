import React from 'react';
import styles from '../page.module.scss';
// ???? 
import classNames from 'classnames/bind';
import H2 from 'assets/theme/Typography/H2/H2';
import ApprovalList from 'containers/Admin/ApprovalList/ApprovalList';
import TransactionList from 'containers/Admin/TransactionList/TransactionList';
import DashboardPanel from 'containers/Admin/DashboardPanel/DashboardPanel';
import DashboardCard from 'components/DashboardCard/DashboardCard';

// ??? 무엇을 의미하는가
const cx = classNames.bind(styles);

const AdminPage = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <H2>Dashboard</H2>
        </div>
        <div className={cx('col-lg-12')}>
          <div className={cx('row')}>
            {/* <DashboardPanel /> */}
            < div className={cx('col-lg-4')} >
              <DashboardCard />
            </div ><div className={cx('col-lg-4')}>
              <DashboardCard />
            </div><div className={cx('col-lg-4')}>
              <DashboardCard />
            </div>
          </div>
        </div>
        <div className={cx('col-lg-6')}>
          <ApprovalList />
        </div>
        <div className={cx('col-lg-6')}>
          <TransactionList />
        </div>
      </div>
    </section>
  )
};

export default AdminPage;
