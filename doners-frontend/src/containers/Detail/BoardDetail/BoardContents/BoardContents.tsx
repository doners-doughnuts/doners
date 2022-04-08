import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import classNames from 'classnames/bind';
import styles from './BoardContents.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H1 from 'assets/theme/Typography/H1/H1';
import P from 'assets/theme/Typography/P/P';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import Avatar from 'assets/theme/Avatar/Avatar';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteBoard, getBoardDetail } from 'services/api/Board';
import { getUserProfile } from 'services/api/UserApi';
import { Link } from 'react-router-dom';
import { fDate, fToNow } from 'utils/formatTime';
import ViewerForm from 'containers/BoardEditor/ViewerForm';

const cx = classNames.bind(styles);
const BoardContents = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [writer, setWriter] = useState('');
  const [views, setViews] = useState(0);
  const [isOwn, setIsOwn] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const { community_id } = useParams<string>();

  const navigate = useNavigate();

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    checkUser();
    getProfileImg();
  }, [writer]);

  const checkUser = () => {
    const user = sessionStorage.getItem('user');
    if (typeof user === 'string') {
      const Juser = JSON.parse(user);
      if (writer === Juser.nickName) {
        setIsOwn(true);
      }
    }
  };
  const getBoard = async () => {
    if (typeof community_id === 'string') {
      const response = await getBoardDetail(community_id);
      setTitle(response.data.communityTitle);
      setContents(response.data.communityDescription);
      setCreateTime(response.data.communityCreateTime);
      setWriter(response.data.communityWriter);
      setViews(response.data.communityViews);
    }
  };

  const getProfileImg = async () => {
    const response = await getUserProfile(writer);
    if (response) {
      // 이미지등록
      setImgSrc(response.data.profileImage);
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
      await deleteBoard(community_id);
      navigate('/community/board');
    }
  };

  // function formatDate(value: string) {
  //   const date = new Date(value);
  //   return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  // }

  return (
    <div className={cx('inner-container')}>
      <header className={cx('article-header')}>
        <div className={cx('button-wrap')}>
          {isOwn ? (
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
          ) : null}
        </div>
        <H1>{title}</H1>

        <div className={cx('info-wrap')}>
          <div className={cx('article-info')}>
            <div>
              {createTime ? (
                <P color="gray">{`작성일: ${fToNow(createTime)}`}</P>
              ) : null}
              <div className={cx('sub-info')}>
                <div className={cx('views')}>
                  <ViewsIcon className={cx('icon')} fill="gray" />
                  <P>{`조회수: ${views}`}</P>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('author')}>
            <Link to={`/profile/${writer}`}>
              <Avatar src={imgSrc} />
            </Link>
            <div className={cx('name')}>
              <P>{`${writer}`}</P>
            </div>
          </div>
        </div>
      </header>
      <main className={cx('content')}>
        {contents !== '' ? <ViewerForm contents={contents} /> : null}
      </main>
    </div>
  );
};

export default BoardContents;
