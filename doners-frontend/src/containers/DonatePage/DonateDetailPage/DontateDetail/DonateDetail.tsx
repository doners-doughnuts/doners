import classNames from 'classnames/bind';
import styles from './DonateDetail.module.scss';
import src from 'assets/images/img-covid19-category.png';
import Button from 'assets/theme/Button/Button';
import DonateInfo from '../DonateInfo/DonateInfo';
import DonateContent from '../DonateContent/DonateContent';
import UserInfo from '../UserInfo/UserInfo';
import DonateHistory from '../DonateHistory/DonateHistory';
import DonateFiles from '../DonateFiles/DonateFiles';
import H1 from 'assets/theme/Typography/H1/H1';
import Tag from 'assets/theme/Tag/Tag';
import { useEffect, useState } from 'react';
import DonateModal from '../DonateModal/DonateModal';
import { getDonationDetail } from 'services/api/Donation';
import { getEpilogueExist } from 'services/api/Epilogue';
import { useParams } from 'react-router';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';
import { checkClosedDonation } from 'utils/formatTime';
import { Link } from 'react-router-dom';
import { CategoryCode } from 'types/ApplicationTypes';
import { mint } from 'services/blockchain/NftApi';

const cx = classNames.bind(styles);

type budgetType = {
  budget: Array<{ plan: string; amount: number; sequence: number }>;
};

// // TODO export (리팩토링 시 따로 뺴기)
// export const CategoryCode: Record<string, string> = {
//   COVID19: '코로나19',
//   WARRIOR: '참전용사',
//   PATIENT: '희귀질환',
//   SINGLE: '미혼모/부',
// };

const DonateDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const [isOwn, setIsOwn] = useState(false);
  const [epilogueId, setEpilogueId] = useState('');

  const [donationData, setDonationData] = useState({
    achievementRate: 0,
    account: '',
    approvalStatusCode: '',
    beneficiaryName: '',
    budget: [],
    categoryCode: '',
    deputy: false,
    description: '',
    donors: [],
    email: '',
    endDate: '',
    evidence: [],
    exist: false,
    image: '',
    name: '',
    phone: '',
    recommendations: 0,
    startDate: '',
    targetAmount: 0,
    title: '',
    views: 0,
    nickname: '',
    contractAddress: '',
  });

  const { donation_id } = useParams();

  const handleDonateClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    getDetail();
  };

  useEffect(() => {
    setIsLoading(true);
    getDetail();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (typeof user === 'string') {
      const Juser = JSON.parse(user);
      if (donationData.nickname === Juser.nickName) {
        setIsOwn(true);
      }
    }
  }, [donationData]);

  const getDetail = async () => {
    if (typeof donation_id === 'string') {
      try {
        const detailResponse = await getDonationDetail(donation_id);
        const data = detailResponse.data;
        const epilogueResponse = await getEpilogueExist(donation_id);
        const epilData = epilogueResponse.data;
        // console.log(epilData);
        setEpilogueId(epilData.epilogueId);
        setIsLoading(false);
        setDonationData(data);
        setIsExist(epilData.exists);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className={cx('container')}>
        <div className={cx('row')}>
          {isLoading && donationData ? (
            <div className={cx('col-lg-12')}>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className={cx('col-lg-12')}>
                <div className={cx('title')}>
                  {/* <H1>{title}</H1> */}
                  <H1>{donationData.title}</H1>
                </div>
                <div className={cx('category')}>
                  <Tag color="black">
                    {CategoryCode[donationData.categoryCode]}
                  </Tag>
                </div>
              </div>
              <div className={cx('col-lg-6')}>
                <div className={cx('thumbnail')}>
                  <img src={donationData.image} alt="ex" />
                </div>
                <div className={cx('donate-btn')}>
                  {checkClosedDonation(donationData.endDate) ? (
                    isExist ? (
                      // TODO
                      <Link to={`/community/epilogue/${epilogueId}`}>
                        <Button color="secondary" size="large" fullWidth>
                          감사후기 보러가기
                        </Button>
                      </Link>
                    ) : isOwn ? (
                      <Link to={`/community/epilogue/write/${donation_id}`}>
                        <Button color="secondary" size="large" fullWidth>
                          감사후기 작성하기
                        </Button>
                      </Link>
                    ) : (
                      <Button color="secondary" size="large" fullWidth disabled>
                        모금 종료
                      </Button>
                    )
                  ) : isOwn ? (
                    <Button
                      color="secondary"
                      size="large"
                      fullWidth
                      shadow
                      onClick={handleDonateClick}
                      disabled
                    >
                      자신이 신청한 모금에는 기부할 수 없습니다.
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      size="large"
                      fullWidth
                      shadow
                      onClick={handleDonateClick}
                    >
                      기부하기
                    </Button>
                  )}
                </div>
                <DonateModal
                  data={donationData}
                  open={isOpen}
                  onClose={handleCloseClick}
                />
              </div>
              {/* <div className={cx('col-lg-6')}>
                <DonateContent data={donationData} />
              </div> */}
              <div className={cx('col-lg-6')}>
                <DonateInfo data={donationData} />
              </div>
              <div className={cx('col-lg-6')}>
                <UserInfo data={donationData} />
                <div className={cx('files')}>
                  <DonateFiles data={donationData} />
                </div>
              </div>
              <div className={cx('col-lg-6')}>
                <DonateHistory data={donationData} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default DonateDetail;
