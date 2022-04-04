import Progressbar from 'assets/theme/Progressbar/Progressbar';
import Tag from 'assets/theme/Tag/Tag';
import H2 from 'assets/theme/Typography/H2/H2';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import { useState } from 'react';
import {
  ApplicationProfileListType,
  CategoryCode,
} from 'types/ApplicationTypes';
import styles from './LastFundingItem.module.scss';
const cx = classNames.bind(styles);

type LastFundingItemProps = {
  item: ApplicationProfileListType;
};

const LastFundingItem = ({ item }: LastFundingItemProps) => {
  const [target, setTarget] = useState(3.89);
  const [current, setCurrent] = useState(1.0);
  let rate = Math.floor((current / target) * 100);

  console.log(item);
  return (
    <div>
      <div className={cx('history-item')}>
        <div className={cx('image')}>
          <div className={cx('card')}>
            <div className={cx('tag')}>
              <Tag color="black">{CategoryCode[item.donationCategoryCode]}</Tag>
            </div>
            <div className={cx('img-wrap')}></div>
          </div>
        </div>
        <div className={cx('img-wrap')}></div>
        <div className={cx('date-wrap')}>
          <Tag color="black">모금 완료</Tag>
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <H4>신청일: </H4>
            </div>
            <H4>2022.03.22</H4>
          </div>
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <H4>마감일: </H4>
            </div>
            <H4>2022.04.08</H4>
          </div>
          <div className={cx('title')}>제목입니다. 기부 바랍니다.</div>
          <div className={cx('value-row')}>
            <div className={cx('value-title')}>
              <H4>최종 모금금액: </H4>
            </div>
            <H2>{String(target)}</H2>
            <H4>SSF</H4>
          </div>
          <Progressbar value={rate} />
          <div className={cx('date-row')}>
            <div className={cx('date-title')}>
              <Span color="gray">모금액 달성률 : </Span>{' '}
              <Span color="green">{String(rate).concat('%')}</Span>
              <Span color="gray"> (0.010212 SSF)</Span>{' '}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LastFundingItem;
