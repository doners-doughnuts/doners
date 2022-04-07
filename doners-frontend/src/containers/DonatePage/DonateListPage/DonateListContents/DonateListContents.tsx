import Checkbox from 'assets/theme/Checkbox/Checkbox';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import DonationCard from 'components/DonationCard/DonationCard';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getDonationList, getSearchDonation } from 'services/api/Donation';
import DonateListHeader from '../DonateListHeader/DonateListHeader';
import styles from './DonateListContents.module.scss';
import src from 'assets/images/img-covid19-category.png';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';
import SyncLoader from 'react-spinners/SyncLoader';
import DonateSearchBar from '../DonateSearchBar/DonateSearchBar';

const cx = classNames.bind(styles);

export type DonateType = {
  donationId: string;
  thumbnail: string;
  title: string;
  beneficiaryName: string;
  userNickname: string;
  targetAmount: number;
  endDate: string;
  contractAddress: string;
};

const DonateListContents = () => {
  const [view, setView] = useState(false);
  const [page, setPage] = useState(1);
  const [donateList, setDonateList] = useState<DonateType[]>([]);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  // const [categoryId, setCategoryId] = useState('');
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [endCheck, setEndCheck] = useState(false);
  const [target, setTarget] = useState<any>(null);

  const pageRef = useRef(page);
  pageRef.current = page;

  const endCheckRef = useRef(endCheck);
  endCheckRef.current = endCheck;

  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const navigate = useNavigate();

  const handleCheckbox = () => {
    setView((prev) => !prev);
    setPage(1);
    setDonateList([]);
    setEndCheck(false);
  };

  useEffect(() => {
    if (categoryParam && sortParam) {
      setCategory(categoryParam);
      setSort(sortParam);
    }
  }, []);

  useEffect(() => {
    if (category !== '' && sort !== '') {
      setIsLoading(true);
      getList();
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [category, sort, view]);

  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getList();
      observer.observe(entry.target);
    }
  };

  const checkCategory = (category: string) => {
    let category_id = '';
    switch (category) {
      case '1':
        category_id = 'COVID19';
        break;
      case '2':
        category_id = 'PATIENT';
        break;
      case '3':
        category_id = 'WARRIOR';
        break;
      case '4':
        category_id = 'SINGLE';
        break;
    }
    return category_id;
  };
  const categoryId = checkCategory(category);

  const getList = async () => {
    if (!endCheckRef.current) {
      setIsLoaded(true);
      const response = await getDonationList(categoryId, sort, page, view);
      console.log(response);
      const data = response.data.donationGetListResponseDTOList;
      if (data.length === 0) {
        setIsLoaded(false);
        setEndCheck(true);
        return;
      }
      setPage((prev) => prev + 1);
      setDonateList((prev) => [...prev, ...data]);
      setIsLoaded(false);
    }
  };

  const handleSearchClick = async (keyword: string) => {
    const response = await getSearchDonation(categoryId, keyword, 1);
    const data = response.data.donationGetListResponseDTOList;
    setDonateList(data);
    console.log(response);
  };

  // const handleSortClick = (sort_id: string) => {
  //   navigate(`/fundraisings/list?category=${category}&sort=${sort_id}`);
  //   setSort(sort_id);
  // };

  const handleCategoryClick = (category_id: string) => {
    navigate(`/fundraisings/list?category=${category_id}&sort=${sort}`);
    // console.log(page);
    setPage(1);
    setDonateList([]);
    setEndCheck(false);
    setCategory(category_id);
  };

  return (
    <>
      <DonateListHeader category={category} onClick={handleCategoryClick} />
      <div className={cx('outer-container')}>
        <section className={cx('container')}>
          <div className={cx('row')}>
            {isLoading ? (
              <div className={cx('loading-spinner-wrapper')}>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <>
                  <div className={cx('col-lg-12', 'header')}>
                    <div className={cx('check-box')}>
                      <Checkbox selected={view} onChange={handleCheckbox}>
                        모금 가능한 기부만 보기
                      </Checkbox>
                    </div>
                    <div className={cx('search-bar')}>
                      <DonateSearchBar onClick={handleSearchClick} />
                      {/* <DonateListSortTab sort={sort} onClick={handleSortClick} /> */}
                    </div>
                  </div>
                  {donateList.length !== 0 ? (
                    donateList.map((data) => {
                      return (
                        <div className={cx('col-lg-4')} key={data.donationId}>
                          {/* donateList id 값 선언 */}
                          <Link to={`/fundraisings/${data.donationId}`}>
                            <DonationCard data={data} />
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className={cx('col-lg-12')}>
                      <div className={cx('none-contents')}>
                        <div className={cx('none-text')}>
                          <H1>모금 정보가 없습니다.</H1>
                        </div>
                        <div className={cx('none-img')}>
                          <img src={src} alt="no donation" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
                <div
                  ref={setTarget}
                  style={{
                    width: '100vw',
                    height: '5px',
                  }}
                ></div>
                {isLoaded ? (
                  <div className={cx('loading-spinner-wrapper')}>
                    <SyncLoader />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DonateListContents;
