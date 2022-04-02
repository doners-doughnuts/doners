import Avatar from 'assets/theme/Avatar/Avatar';
import H2 from 'assets/theme/Typography/H2/H2';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { ApplicationListItemType } from 'pages/AdminPage/AdminPage';
import styles from './ApplicationListItem.module.scss';

const cx = classNames.bind(styles);


const ApplicationListItem = (item: ApplicationListItemType) => {

  const { donationId, thumbnail, title, beneficiaryName, targetAmount } = item.item;

  return (
    <div className={cx('card')}>
      <P>{donationId}</P>
      <span className={cx('card-content')}>
        {/* <img src={thumbnail}></img> */}
        <Avatar src={thumbnail} />
        {/* <H2 >{content.toString()}</H2>
        <P>{label}</P> */}
      </span>
      <span className={cx('card-content-label')}>{targetAmount}</span>
    </div >
  )

}

export default ApplicationListItem;