import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H1 from 'assets/theme/Typography/H1/H1';
import H2 from 'assets/theme/Typography/H2/H2';
import H4 from 'assets/theme/Typography/H4/H4';
import H5 from 'assets/theme/Typography/H5/H5';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './TotalDonate.module.scss';

const cx = classNames.bind(styles);

const TotalDonate = () => {
  return (
    <div className={cx('form')}>
      <P>총 모금액</P>
      <div className={cx('achieved-money')}>
        <H1>2,000,000</H1>
        <P>KRW</P>
      </div>
      <div className={cx('target-money')}>
        <H4 color="gray">2,000,000</H4>
        <H4 color="gray"> KRW 목표</H4>
      </div>
      <Progressbar value={80} />
      <div className={cx('achived-rate')}>
        <Span color="gray">모금액 달성률: </Span>
        <Span color="green">50%</Span>
      </div>
    </div>
  );
};

export default TotalDonate;
