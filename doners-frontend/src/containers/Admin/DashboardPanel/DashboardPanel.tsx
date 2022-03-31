import classNames from 'classnames/bind';
import DashboardCard from 'components/DashboardCard/DashboardCard';
import styles from './DashboardPanel.module.scss';
const cx = classNames.bind(styles);

const DashboardPanel = () => {
  return (
    <>
      < div className={cx('col-lg-4')} >
        <DashboardCard />
      </div ><div className={cx('col-lg-4')}>
        <DashboardCard />
      </div><div className={cx('col-lg-4')}>
        <DashboardCard />
      </div>
    </>
  )

}

export default DashboardPanel;