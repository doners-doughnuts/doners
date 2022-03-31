import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import classNames from 'classnames/bind';
import BoardListItem from 'components/BoardListItem/BoardListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoardList } from 'services/api/Board';
import styles from './BoardList.module.scss';
import src from 'assets/images/img-covid19-category.png';

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
  const [sequence, setSequence] = useState(1);
  const [listItems, setListItems] = useState<ListItemType[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const response = await getBoardList(sequence);
    console.log(response.data);
    const data = response.data.communityGetListResponseDTOList;
    setListItems((prev) => [...prev, ...data]);
  };

  return (
    <>
      <div className={cx('btn-row')}>
        <div className={cx('btn')}>
          <Link to="write">
            <Button color="secondary" size="small" fullWidth>
              글 작성
            </Button>
          </Link>
        </div>
      </div>
      {listItems.length !== 0 ? (
        listItems.map((data) => {
          return (
            <Link to={data.communityId} key={data.communityId}>
              <BoardListItem data={data} />
            </Link>
          );
        })
      ) : (
        <div className={cx('none-contents')}>
          <div className={cx('none-text')}>
            <H1>등록된 감사후기가 없습니다.</H1>
          </div>
          <div className={cx('none-img')}>
            <img src={src} alt="no donation" />
          </div>
        </div>
      )}
    </>
  );
};

export default BoardList;
