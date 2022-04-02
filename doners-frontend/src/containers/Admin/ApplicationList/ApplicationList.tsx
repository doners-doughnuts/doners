import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import ApplicationListItem from 'components/Admin/ApplicationListItem/ApplicationListItem';
import { ApplicationListItemType } from 'pages/AdminPage/AdminPage';
import _applicationList from '_mocks_/applicationList';
import styles from './ApplicationList.module.scss';
const cx = classNames.bind(styles);

type ApplicationListType = {
  applicationList: ApplicationListItemType[];
};

const ApplicationList = ({ applicationList }: ApplicationListType) => {
  // console.log(_applicationList)
  return (
    <section className={cx('container')}>
      <div className={cx('header')}>
        <H3>기부 신청 관리</H3>
      </div>
      <div className={cx('inner-container')}>
        {applicationList.map((item: ApplicationListItemType, idx) => (
          <ApplicationListItem key={idx} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ApplicationList;
