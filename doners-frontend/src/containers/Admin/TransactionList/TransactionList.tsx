import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './TransactionList.module.scss';
// import { ReactComponent as WaveIcon } from 'assets/images/icon/wave.svg';
import reciept from 'assets/images/reciept.png'

const cx = classNames.bind(styles);

const TransactionList = ({ transactionList }: any) => {


  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <H3>트랜잭션 로그</H3>
      </div>
      <div className={cx('inner-container')}>
        {/* <div className={cx('background')}> */}
        <img src={reciept} alt='background' />
        {/* <WaveIcon /> */}
        {/* </div> */}
      </div>
    </div>
  )

}

export default TransactionList;