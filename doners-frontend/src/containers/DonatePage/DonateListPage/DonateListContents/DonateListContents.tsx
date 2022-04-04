import Checkbox from 'assets/theme/Checkbox/Checkbox';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import DonationCard from 'components/DonationCard/DonationCard';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  getAvailableDonationList,
  getDonationList,
} from 'services/api/Donation';
import DonateListHeader from '../DonateListHeader/DonateListHeader';
import DonateListSortTab from '../DonateListSortTab/DonateListSortTab';
import styles from './DonateListContents.module.scss';
import src from 'assets/images/img-covid19-category.png';
const cx = classNames.bind(styles);

export type DonateType = {
  donationId: string;
  thumbnail: string;
  title: string;
  beneficiaryName: string;
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

  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const navigate = useNavigate();

  const handleCheckbox = () => {
    setView((prev) => !prev);
  };

  useEffect(() => {
    if (categoryParam && sortParam) {
      setCategory(categoryParam);
      setSort(sortParam);
    }
  }, []);

  useEffect(() => {
    if (category !== '' && sort !== '') {
      getList();
    }
  }, [category, sort, view]);

  // useEffect(() => {
  //   getAvailableList();
  // }, [view]);

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
    const response = await getDonationList(categoryId, sort, page, view);
    console.log(response);
    setDonateList(response.data.donationGetListResponseDTOList);
  };

  const handleSortClick = (sort_id: string) => {
    navigate(`/fundraisings/list?category=${category}&sort=${sort_id}`);
    setSort(sort_id);
  };

  const handleCategoryClick = (category_id: string) => {
    navigate(`/fundraisings/list?category=${category_id}&sort=${sort}`);
    setCategory(category_id);
  };

  return (
    <>
      <DonateListHeader category={category} onClick={handleCategoryClick} />
      <div className={cx('outer-container')}>
        <section className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-4')}>
              <Checkbox selected={view} onChange={handleCheckbox}>
                모금 가능한 기부만 보기
              </Checkbox>
            </div>
            <div className={cx('col-lg-8')}>
              <DonateListSortTab sort={sort} onClick={handleSortClick} />
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
          </div>
        </section>
      </div>
    </>
  );
};

export default DonateListContents;
