import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import BoardListItem from 'components/BoardListItem/BoardListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoardList } from 'services/api/Board';
import styles from './BoardList.module.scss';
import src from 'assets/images/img-covid19-category.png';
import LoadingSpinner from 'assets/theme/LoadingSpinner/LoadingSpinner';

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
  const [throttle, setThrottle] = useState(false);

  // const handleScroll = () => {
  //   if (throttle) return;
  //   if (!throttle) {
  //     setThrottle(true);
  //     setTimeout(async () => {
  //       setPage((page) => page + 1);
  //       setThrottle(false);
  //     }, 300);
  //   }
  // };

  useEffect(() => {
    console.log(page);
    setIsLoading(true);
    getList();
  }, [page]);

  const getList = async () => {
    const response = await getBoardList(page);
    console.log(response.data);
    const data = response.data.communityGetListResponseDTOList;
    setListItems((prev) => [...prev, ...data]);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {isLoading ? (
        <div className={cx('col-lg-12')}>
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className={cx('inner-container')}
          // onScroll={handleScroll}
        >
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
      )}
    </>
  );
};

export default BoardList;
