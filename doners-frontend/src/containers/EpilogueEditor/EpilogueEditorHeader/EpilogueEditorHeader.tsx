import Avatar from 'assets/theme/Avatar/Avatar';
import Tag from 'assets/theme/Tag/Tag';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './EpilogueEditorHeader.module.scss';
import { ReactComponent as ImageIcon } from 'assets/images/icon/image.svg';
import { useEffect, useRef, useState } from 'react';
import { getDonationDetail } from 'services/api/Donation';
import { DontationDetailType } from 'types/DonationTypes';
import { getUserProfile } from 'services/api/UserApi';

const cx = classNames.bind(styles);

const CategoryCode: Record<string, string> = {
  COVID19: '코로나19',
  WARRIOR: '참전용사',
  PATIENT: '희귀질환',
  SINGLE: '미혼모/부',
};

const EpilogueEditorHeader = ({ onChange, donation_id }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files;
    onChange(file);
    setImgFile(URL.createObjectURL(file[0]));
    const formData = new FormData();
    formData.append('file', file[0]);
  };

  const handleDonateDetail = async () => {
    const result = await getDonationDetail(donation_id);
    console.log(result);
    setCategory(result.data.categoryCode);
    setTitle(result.data.title);
    setEndDate(result.data.endDate);
    setStartDate(result.data.startDate);
    setName(result.data.nickname);
  };

  const handleUserProfile = async () => {
    const result = await getUserProfile(name);
    setProfile(result.data.profileImage);
  };

  useEffect(() => {
    if (name) {
      handleUserProfile();
    }
  }, [name]);

  useEffect(() => {
    if (donation_id) {
      handleDonateDetail();
    }
  }, [donation_id]);

  return (
    <div className={cx('header')}>
      <div className={cx('info')}>
        <div className={cx('user-info')}>
          <Avatar src={profile} />
          <div className={cx('name')}>
            <P>{name}</P>
          </div>
        </div>
        <div className={cx('donation-info')}>
          <div className={cx('category-title')}>
            <div className={cx('category')}>
              <Tag color="black">{CategoryCode[category]}</Tag>
            </div>
            <H4>{title}</H4>
          </div>
          <H4>{`모금 진행 기간 : ${startDate} ~ ${endDate}`}</H4>
          <Link to={`/fundraisings/${donation_id}`}>
            <div className={cx('detail_link')}>
              <P color="green">기부 상세 보기</P>
            </div>
          </Link>
        </div>
      </div>

      <div className={cx('thumbnail')}>
        <div className={cx('default')} onClick={handleUploadBtnClick}>
          <input
            type="file"
            id="inputImage"
            className={cx('upload-image')}
            onChange={handleUploadImage}
            ref={inputRef}
            accept="image/*"
          />
          {imgFile ? (
            <div className={cx('preview-img')}>
              <img src={imgFile} alt="preview" />
            </div>
          ) : (
            <div className={cx('upload')}>
              <ImageIcon width={42} height={42} />
              <H4 color="blue">이미지를 업로드하세요.</H4>
              <P color="gray">여기를 클릭하여 파일을 선택해주세요.</P>
            </div>
          )}
        </div>
        {/* <img src={src} alt="ex" /> */}
      </div>
    </div>
  );
};

export default EpilogueEditorHeader;
