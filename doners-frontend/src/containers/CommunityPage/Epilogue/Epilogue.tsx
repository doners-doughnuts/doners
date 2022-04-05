import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import classNames from 'classnames/bind';
import styles from './Epilogue.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getEpilogueList } from 'services/api/Epilogue';
import H1 from 'assets/theme/Typography/H1/H1';
import src from 'assets/images/img-covid19-category.png';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';
import SyncLoader from 'react-spinners/SyncLoader';

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
  const [page, setPage] = useState(1);
  const [listItems, setListItems] = useState<ListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [endCheck, setEndCheck] = useState(false);
  const [target, setTarget] = useState<any>(null);

  const pageRef = useRef(page);
  pageRef.current = page;

  const endCheckRef = useRef(endCheck);
  endCheckRef.current = endCheck;

  useEffect(() => {
    setIsLoading(true);
    getList();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

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

  const getList = async () => {
    if (!endCheckRef.current) {
      setIsLoaded(true);
      const response = await getEpilogueList(page);
      const data = response.data.epilogueGetListResponseDTOList;
      console.log(data);
      if (data.length === 0) {
        setIsLoaded(false);
        setEndCheck(true);
        return;
      }
      setPage((prev) => prev + 1);
      setListItems((prev) => [...prev, ...data]);
      setIsLoaded(false);
    }
  };

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        {isLoading ? (
          <div className={cx('col-lg-12')}>
            <div className={cx('loading-spinner-wrapper')}>
              <LoadingSpinner />
            </div>
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
      </div>
    </section>
  );
};

export default Epilogue;
