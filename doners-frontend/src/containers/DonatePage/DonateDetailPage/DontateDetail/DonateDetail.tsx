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
import { useParams } from 'react-router';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

type budgetType = {
  // plan: string;
  // amount: number;
  // sequence: number;
  budget: Array<{ plan: string; amount: number; sequence: number }>;
};

type donorsType = {};
export type DonationDetailType = {
  achievementRate: number;
  approvalStatusCode: string;
  beneficiaryName: string;
  budget: Array<{ plan: string; amount: number; sequence: number }>;
  categoryCode: string;
  deputy: boolean;
  description: string;
  donors?: donorsType;
  email: string;
  endDate: string;
  evidence: object;
  exist: boolean;
  image: string;
  name: string;
  phone: string;
  recommendations: number;
  startDate: string;
  targetAmount: number;
  title: string;
  views: number;
  nickname: string;
};

const DonateDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [donationData, setDonationData] = useState({
    achievementRate: 0,
    approvalStatusCode: '',
    beneficiaryName: '',
    budget: [],
    categoryCode: '',
    deputy: false,
    description: '',
    donors: [],
    email: '',
    endDate: '',
    evidence: {},
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
  });
  const { donation_id } = useParams();

  const handleDonateClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getDetail();
  }, []);

  const getDetail = async () => {
    if (typeof donation_id === 'string') {
      try {
        const response = await getDonationDetail(donation_id);
        const data = response.data;
        console.log(data);
        // setTitle(data.title);
        setIsLoading(false);
        setDonationData(data);
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
                  <Tag color="black">{donationData.categoryCode}</Tag>
                </div>
              </div>
              <div className={cx('col-lg-6')}>
                <div className={cx('thumbnail')}>
                  <img src={donationData.image} alt="ex" />
                </div>
                <div className={cx('donate-btn')} onClick={handleDonateClick}>
                  <Button color="primary" size="large" fullWidth shadow>
                    기부하기
                  </Button>
                </div>
                <DonateModal open={isOpen} onClose={handleCloseClick} />
              </div>
              <div className={cx('col-lg-6')}>
                <DonateContent data={donationData} />
              </div>
              <div className={cx('col-lg-6')}>
                <DonateInfo data={donationData} />
              </div>
              <div className={cx('col-lg-6', 'user-info')}>
                <UserInfo data={donationData} />
                <div className={cx('file-form')}>
                  <DonateFiles data={donationData} />
                </div>
              </div>
              <div className={cx('col-lg-6')}>
                <DonateHistory />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default DonateDetail;
