import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import classNames from 'classnames/bind';
import styles from './Epilogue.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEpilogueList } from 'services/api/Epilogue';
import H1 from 'assets/theme/Typography/H1/H1';
import src from 'assets/images/img-covid19-category.png';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

type ListItemType = {
  epilogueCreateTime: string;
  epilogueDescription: string;
  epilogueId: string;
  epilogueTitle: string;
  epilogueViews: number;
  epilogueWriter: string;
};

const Epilogue = () => {
  const [sequence, setSequence] = useState(1);
  const [listItems, setListItems] = useState<ListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getList();
  }, []);

  const getList = async () => {
    const response = await getEpilogueList(sequence);
    console.log(response.data);
    const data = response.data.epilogueGetListResponseDTOList;
    // console.log(data);
    setListItems((prev) => [...prev, ...data]);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  console.log(isLoading);

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        {isLoading ? (
          <div className={cx('col-lg-12')}>
            <LoadingSpinner />
          </div>
        ) : listItems.length !== 0 ? (
          listItems.map((data) => {
            return (
              <div className={cx('col-lg-4')} key={data.epilogueId}>
                <Link to={data.epilogueId}>
                  <EpilogueCard data={data} />
                </Link>
              </div>
            );
          })
        ) : (
          <div className={cx('col-lg-12')}>
            <div className={cx('none-contents')}>
              <div className={cx('none-text')}>
                <H1>등록된 감사후기가 없습니다.</H1>
              </div>
              <div className={cx('none-img')}>
                <img src={src} alt="no donation" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Epilogue;
