import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './TransactionList.module.scss';
const cx = classNames.bind(styles);

const TransactionList = ({ transactionList }: any) => {


  return (
    < section className={cx('container')} >
      <div className={cx('header')}>
        <H3>트랜잭션 로그</H3>
      </div>
      <div className={cx('inner-container')}>
        lskjfsdfljlsdfjsl
      </div>
    </section>
  )

}

export default TransactionList;