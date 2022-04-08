import Badge from 'assets/theme/Badge/Badge';
import classNames from 'classnames/bind';
import TotalDonate from 'containers/EpilogueEditor/TotalDonate/TotalDonate';
import styles from './EpilogueDetailTotalDonate.module.scss';
const cx = classNames.bind(styles);

const EpilogueDetailTotalDonate = ({ history, donationId }: any) => {
  return (
    <div className={cx('receipt')}>
      <div className={cx('badge')}>
        <Badge color="yellow">총 모금액</Badge>
      </div>
      <TotalDonate donationId={donationId} />
    </div>
  );
};

export default EpilogueDetailTotalDonate;
