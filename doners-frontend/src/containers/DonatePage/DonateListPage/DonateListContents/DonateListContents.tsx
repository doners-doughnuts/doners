import Checkbox from 'assets/theme/Checkbox/Checkbox';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import DonationCard from 'components/DonationCard/DonationCard';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getDonationList } from 'services/api/Donation';
import DonateListHeader from '../DonateListHeader/DonateListHeader';
import DonateListSortTab from '../DonateListSortTab/DonateListSortTab';
import styles from './DonateListContents.module.scss';
import src from 'assets/images/img-covid19-category.png';
const cx = classNames.bind(styles);

const DonateListContents = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [page, setPage] = useState(1);
  const [donateList, setDonateList] = useState([]);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const handleCheckbox = () => {
    setIsSelect((prev) => !prev);
  };

  useEffect(() => {
    if (categoryParam && sortParam) {
      setCategory(categoryParam);
      setSort(sortParam);
    }
  }, []);

  useEffect(() => {
    console.log(category);
    console.log(sort);
    getList();
  }, [category, sort]);

  const getList = useCallback(async () => {
    if (typeof category === 'string' && typeof sort === 'string') {
      const response = await getDonationList(category, sort, page);
      setDonateList(response.data.donationGetListResponseDTOList);
      console.log(response);
    }
  }, []);

  const handleSortClick = (sort_id: string) => {
    setSort(sort_id);
  };

  return (
    <>
      <div className={cx('outer-container')}>
        <section className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-lg-4')}>
              <Checkbox selected={isSelect} onChange={handleCheckbox}>
                모금 가능한 기부만 보기
              </Checkbox>
            </div>
            <div className={cx('col-lg-8')}>
              <DonateListSortTab sort={sort} onClick={handleSortClick} />
            </div>
            {donateList.length !== 0 ? (
              donateList.map((data) => {
                return (
                  <div className={cx('col-lg-4')}>
                    {/* donateList id 값 선언 */}
                    <Link to={`/fundraisings/1`}>
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
