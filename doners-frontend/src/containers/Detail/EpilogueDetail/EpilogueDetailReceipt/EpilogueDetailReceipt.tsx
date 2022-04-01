import Badge from 'assets/theme/Badge/Badge';
import classNames from 'classnames/bind';
import HistoryItem from 'components/HistoryItem/HistoryItem';
import TotalDonate from 'containers/EpilogueEditor/TotalDonate/TotalDonate';
import styles from './EpilogueDetailReceipt.module.scss';
const cx = classNames.bind(styles);

const EpilogueDetailReceipt = ({ history }: any) => {
  return (
    <div className={cx('receipt')}>
      <div className={cx('badge')}>
        <Badge color="green">모금액 사용 내역</Badge>
      </div>
      <TotalDonate />
      <div className={cx('history')}>
        {history.map((data: any, idx: number) => {
          console.log(data);
          return <HistoryItem value={data} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default EpilogueDetailReceipt;
