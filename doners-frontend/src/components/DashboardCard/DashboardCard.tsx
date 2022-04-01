import H2 from 'assets/theme/Typography/H2/H2';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import styles from './DashboardCard.module.scss';

const cx = classNames.bind(styles);

type DashboardCardType = {
  header: string;
  content: number;
  label: string;
}

const DashboardCard = ({ header, content, label }: DashboardCardType) => {


  return (
    <div className={cx('card')}>
      <P>{header}</P>
      <span className={cx('card-content')}>

        {content.toString()}
        {/* <H2 >{content.toString()}</H2>
        <P>{label}</P> */}
      </span>
      <span className={cx('card-content-label')}>{label}</span>
    </div >
  )

}

export default DashboardCard;