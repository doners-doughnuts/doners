import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import BoardListItem from 'components/BoardListItem/BoardListItem';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoardList } from 'services/api/Board';
import styles from './BoardList.module.scss';
import src from 'assets/images/img-covid19-category.png';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';
import SyncLoader from 'react-spinners/SyncLoader';

const cx = classNames.bind(styles);
export type ListItemType = {
  communityCode: string;
  communityCreateTime: string;
  communityDescription: string;
  communityId: string;
  communityTitle: string;
  communityViews: number;
  communityWriter: string;
  comments: number;
};
const BoardList = () => {
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
        threshold: 1,
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
      const response = await getBoardList(pageRef.current);
      console.log(response);
      const data = response.data.communityGetListResponseDTOList;

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
    <div className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            {isLoading ? (
              <div className={cx('loading-spinner-wrapper')}>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div>
                  <div className={cx('btn-row')}>
                    <div className={cx('btn')}>
                      <Link to="write">
                        <Button color="secondary" size="small" fullWidth>
                          글 작성
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {listItems.length === 0 ? (
                    <div className={cx('none-contents')}>
                      <div className={cx('none-text')}>
                        <H1>등록된 감사후기가 없습니다.</H1>
                      </div>
                      <div className={cx('none-img')}>
                        <img src={src} alt="no donation" />
                      </div>
                    </div>
                  ) : (
                    listItems.map((data) => {
                      return (
                        <Link to={data.communityId} key={data.communityId}>
                          <BoardListItem data={data} />
                        </Link>
                      );
                    })
                  )}
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default BoardList;
