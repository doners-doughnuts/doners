import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './DonationCard.module.scss';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
import Tag from 'assets/theme/Tag/Tag';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import { DonateType } from 'containers/DonatePage/DonateListPage/DonateListContents/DonateListContents';
import { checkClosedDonation } from 'utils/formatTime';
import { fundraiserIsWithdraw, nowBalance } from 'services/blockchain/SsfApi';
import { useEffect, useState } from 'react';
import H4 from 'assets/theme/Typography/H4/H4';
import { getUserProfile } from 'services/api/UserApi';
const cx = classNames.bind(styles);

type DonateProps = {
  data: DonateType;
};

const DonationCard = ({ data }: DonateProps) => {
  const [rate, setRate] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [collectedBalance, setCollectedBalance] = useState(0);

  // const getCurrentBalance = async () => {
  //   if (data.contractAddress) {
  //     const result = await nowBalance(data.contractAddress);
  //     setCurrent(result);
  //   }
  // };

  const getProfileImg = async () => {
    const response = await getUserProfile(data.userNickname);
    if (response) {
      // 이미지등록
      setImgSrc(response.data.profileImage);
    }
  };

  useEffect(() => {
    if (data.contractAddress) {
      checkWithdrawState();
    }
  }, [data]);

  const checkWithdrawState = async () => {
    // (완료) 모금액 수령이 완료되었는지 검사
    const response = await fundraiserIsWithdraw(data.contractAddress);
    setCollectedBalance(response.targetMoney);
  };

  useEffect(() => {
    // getCurrentBalance();
    getProfileImg();
  }, []);

  useEffect(() => {
    const result = Math.floor((collectedBalance / data.targetAmount) * 100);
    setRate(result);
  }, [collectedBalance]);

  return (
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('user-info')}>
          <Avatar src={imgSrc} />
          <div className={cx('name')}>
            <div>{data.beneficiaryName}</div>
            {/* <Span>12일 전</Span> */}
          </div>
        </div>
        <div className={cx('tag')}>
          {checkClosedDonation(data.endDate) ? (
            <Tag color="black">모금 종료</Tag>
          ) : (
            <Tag color="orange">모금 진행중</Tag>
          )}
        </div>
      </div>
      <div className={cx('title')}>
        <H5>{data.title}</H5>
      </div>
      <div className={cx('img-wrap')}>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div className={cx('progress-bar')}>
        <Progressbar value={rate} />
      </div>
      <div className={cx('progress-rate')}>
        <Span>기부금 달성률 : </Span>
        <H4>{String(rate)}</H4>
        <Span>%</Span>
      </div>
    </div>
  );
};

export default DonationCard;
