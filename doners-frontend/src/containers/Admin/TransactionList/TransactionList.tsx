import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './TransactionList.module.scss';
// import { ReactComponent as WaveIcon } from 'assets/images/icon/wave.svg';
import reciept from 'assets/images/reciept.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { TransactionListItemType } from 'types/TransactionTypes';
import TransactionListItem from 'components/Admin/TransactionListItem/TransactionListItem';

const cx = classNames.bind(styles);

const TransactionList = ({ transactionList }: any) => {
  // const [transactionList, setTransactionList] = useState<TransactionType>();

  // useEffect(() => {
  //   console.log('TODO ');
  // }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <H3>트랜잭션 로그</H3>
      </div>
      <div className={cx('inner-container')}>
        <img src={reciept} alt="background" />
        {transactionList.length > 0
          ? transactionList.map((e: any, idx: number) => (
              <TransactionListItem key={idx} item={e} />
            ))
          : null}
      </div>
    </div>
  );
};

export default TransactionList;
