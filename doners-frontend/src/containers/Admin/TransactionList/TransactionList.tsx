import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './TransactionList.module.scss';
// import { ReactComponent as WaveIcon } from 'assets/images/icon/wave.svg';
import reciept from 'assets/images/reciept.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { TransactionListItemType } from 'types/TransactionTypes';
import TransactionListItem from 'components/Admin/TransactionListItem/TransactionListItem';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import { fFundraiserContractTime, fToNow } from 'utils/formatTime';
import Tag from 'assets/theme/Tag/Tag';

const cx = classNames.bind(styles);

const TransactionList = ({ transactionList }: any) => {
  // const [transactionList, setTransactionList] = useState<TransactionType>();
  console.log(transactionList);

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
        <div className={cx('vl')}></div>
        <div className={cx('content')}>
          {transactionList.length > 0
            ? transactionList
                .slice(0, transactionList.length - 1)
                .map((item: any, idx: number) => (
                  <>
                    <TransactionListItem key={idx} item={item} />
                    {/* <TransactionListItem key={idx * 12} item={item} /> */}
                    {/* <TransactionListItem key={idx * 13} item={item} /> */}
                  </>
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
