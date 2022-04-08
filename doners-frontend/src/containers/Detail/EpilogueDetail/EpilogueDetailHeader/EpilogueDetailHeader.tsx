import classNames from 'classnames/bind';
import styles from './EpilogueDetailHeader.module.scss';
import Tag from 'assets/theme/Tag/Tag';
import H5 from 'assets/theme/Typography/H5/H5';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H1 from 'assets/theme/Typography/H1/H1';
import { Link } from 'react-router-dom';
import P from 'assets/theme/Typography/P/P';
import Avatar from 'assets/theme/Avatar/Avatar';
import Span from 'assets/theme/Typography/Span/Span';
import { ReactComponent as ClipIcon } from 'assets/images/icon/clip.svg';
import { useEffect, useState } from 'react';
import { getUserProfile } from 'services/api/UserApi';
import { getDonationDetail } from 'services/api/Donation';
import H4 from 'assets/theme/Typography/H4/H4';
import { CategoryCode } from 'types/ApplicationTypes';

const cx = classNames.bind(styles);
type headerType = {
  title: string;
  date: string;
  writer: string;
  src: string;
  donationId: string;
  onDelete: (...args: any[]) => void;
  onModify: (...args: any[]) => void;
};
const EpilogueDetailHeader = ({
  title,
  date,
  writer,
  src,
  donationId,
  onDelete,
  onModify,
}: headerType) => {
  const [isOwn, setIsOwn] = useState(false);
  const [profile, setProfile] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const checkUser = () => {
    const user = sessionStorage.getItem('user');
    if (typeof user === 'string') {
      const Juser = JSON.parse(user);
      if (writer === Juser.nickName) {
        setIsOwn(true);
      }
    }
  };

  const getProfileImg = async () => {
    const response = await getUserProfile(writer);
    if (response) {
      // 이미지등록
      setProfile(response.data.profileImage);
    }
  };

  const getDonateDetail = async () => {
    const response = await getDonationDetail(donationId);
    setCategory(response.data.categoryCode);
    setStartDate(response.data.startDate);
    setEndDate(response.data.endDate);
  };
  useEffect(() => {
    if (donationId) {
      getDonateDetail();
    }
  }, [donationId]);

  useEffect(() => {
    checkUser();
    getProfileImg();
  }, [writer]);

  return (
    <div className={cx('header')}>
      <div className={cx('thumbnail')}>
        <img src={src} alt="ex" />
        <div className={cx('clip-icon')}>
          <ClipIcon />
        </div>
      </div>
      <div className={cx('epilogue-info')}>
        <div className={cx('top')}>
          <Tag color="black">{CategoryCode[category]}</Tag>
          <div className={cx('button-wrap')}>
            {isOwn ? (
              <div className={cx('buttons')}>
                <CustomButton
                  src={editIcon}
                  color="yellow"
                  shadow
                  size="small"
                  onClick={onModify}
                >
                  수정
                </CustomButton>
                <CustomButton
                  src={deleteIcon}
                  shadow
                  size="small"
                  onClick={onDelete}
                >
                  삭제
                </CustomButton>
              </div>
            ) : null}
          </div>
        </div>
        <div className={cx('info')}>
          <div className={cx('left-info')}>
            <H1>{title}</H1>
            <div className={cx('donation-info')}>
              <div className={cx('donation-date')}>
                <H4>모금 진행 기간 : </H4>
                <H4>{startDate}</H4>
                <H4> ~ </H4>
                <H4>{endDate}</H4>
              </div>
              <Link to={`/fundraisings/${donationId}`}>
                <div className={cx('detail_link')}>
                  <P color="green">기부 상세 보기</P>
                </div>
              </Link>
            </div>
          </div>
          <div className={cx('user-info')}>
            <Link to={`/profile/${writer}`}>
              <Avatar src={profile} />
            </Link>
            <div className={cx('name')}>
              <P>{writer}</P>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpilogueDetailHeader;
