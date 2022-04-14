import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './TransactionList.module.scss';
import reciept from 'assets/images/reciept.png';
import TransactionListItem from 'components/Admin/TransactionListItem/TransactionListItem';

const cx = classNames.bind(styles);

const TransactionList = ({ transactionList }: any) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <H3>트랜잭션 이력</H3>
      </div>
      <div className={cx('inner-container')}>
        <img className={cx('img')} src={reciept} alt="background" />
        <div className={cx('vl')}></div>
        <div className={cx('list')}>
          <div className={cx('content')}>
            {transactionList.length > 0
              ? transactionList
                  .slice(0, transactionList.length - 1)
                  .map((item: any, idx: number) => (
                    <TransactionListItem key={idx} item={item} />
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
