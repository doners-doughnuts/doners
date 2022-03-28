import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import classNames from 'classnames/bind';
import styles from './BoardContents.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import covid19 from 'assets/images/img-covid19-category.png';
import H1 from 'assets/theme/Typography/H1/H1';
import P from 'assets/theme/Typography/P/P';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import { ReactComponent as CommentIcon } from 'assets/images/icon/comment.svg';
import H3 from 'assets/theme/Typography/H3/H3';
import Avatar from 'assets/theme/Avatar/Avatar';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteBoard, getBoardDetail } from 'services/api/Board';

const cx = classNames.bind(styles);
const BoardContents = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [writer, setWriter] = useState('');
  const [views, setViews] = useState(0);

  const { community_id } = useParams<string>();

  const navigate = useNavigate();

  console.log(community_id);

  useEffect(() => {
    getBoard();
  }, []);

  const getBoard = async () => {
    if (typeof community_id === 'string') {
      try {
        const response = await getBoardDetail(community_id);
        console.log(response.data);
        setTitle(response.data.communityTitle);
        setContents(response.data.communityDescription);
        setCreateTime(response.data.communityCreateTime);
        setWriter(response.data.communityWriter);
        setViews(response.data.communityViews);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    deleteHandler();
  };

  const handleModifyClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    navigate(`/community/board/modify/${community_id}`);
  };

  const deleteHandler = async () => {
    if (typeof community_id === 'string') {
      try {
        const response = await deleteBoard(community_id);
        console.log(response);
        navigate('/community/board');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cx('inner-container')}>
      <header className={cx('article-header')}>
        <div className={cx('button-wrap')}>
          <div className={cx('buttons')}>
            <CustomButton
              src={editIcon}
              color="yellow"
              shadow
              onClick={handleModifyClick}
            >
              수정
            </CustomButton>
            <CustomButton src={deleteIcon} shadow onClick={handleDeleteClick}>
              삭제
            </CustomButton>
          </div>
        </div>
        <H1>{title}</H1>
        <div className={cx('info-wrap')}>
          <div className={cx('article-info')}>
            <div>
              <P color="gray">{`작성일: ${createTime}`}</P>
              <div className={cx('sub-info')}>
                <div className={cx('views')}>
                  <ViewsIcon className={cx('icon')} fill="gray" />
                  <P>{`조회수: ${views}`}</P>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('author')}>
            <Avatar />
            <div className={cx('name')}>
              <P>{`${writer}`}</P>
            </div>
          </div>
        </div>
      </header>
      <main className={cx('content')}>
        {contents !== '' ? <Viewer initialValue={contents} /> : null}
      </main>
    </div>
  );
};

export default BoardContents;
