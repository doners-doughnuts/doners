import { useState } from 'react';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import Span from 'assets/theme/Typography/Span/Span';
import classNames from 'classnames/bind';
import styles from './FundingItem.module.scss';
import Tag from 'assets/theme/Tag/Tag';
import Button from 'assets/theme/Button/Button';
import FundModal from 'containers/ProfilePage/FundModal/FundModal';
const cx = classNames.bind(styles);

const FundingItem = () => {
  const [target, setTarget] = useState(3.89);
  const [current, setCurrent] = useState(1.0);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  let rate = Math.floor((current / target) * 100);

  return (
    <div>
      <div className={cx('history-item')}>
        <div className={cx('image')}>
          <div className={cx('card')}>
            <div className={cx('tag')}>
              <Tag color="black">코로나19</Tag>
            </div>
            <div className={cx('img-wrap')}></div>
          </div>
        </div>
        <div className={cx('img-wrap')}></div>
        <div className={cx('date-wrap')}>
          <Tag color="green">모금 진행중</Tag>
          <Button color={'primary'} onClick={openModal}>
            수령 모달
          </Button>
          <FundModal open={modalOpen} close={closeModal} />
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
            <H4 color="red">(D-23)</H4>
          </div>
          <div className={cx('title')}>제목입니다. 기부 바랍니다.</div>
          <div className={cx('value-row')}>
            <div className={cx('value-title')}>
              <H4>목표금액: </H4>
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

export default FundingItem;
