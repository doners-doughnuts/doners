import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import { deleteComments, modifyComment } from 'services/api/Comment';
import { useEffect, useState } from 'react';
import { getUserProfile } from 'services/api/UserApi';
import Textarea from 'assets/theme/Textarea/Textarea';

const cx = classNames.bind(styles);
const Comment = ({ id, date, content, nickname, onDelete }: any) => {
  const [isOwn, setIsOwn] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  // const handleModifyClick = () => {};
  const handleDeleteClick = () => {
    delComment();
  };

  const delComment = async () => {
    const result = await deleteComments(id);
    onDelete(id);
    console.log(result);
  };

  const checkUser = () => {
    const item = localStorage.getItem('user');
    if (typeof item === 'string') {
      const Juser = JSON.parse(item);
      if (nickname === Juser.userNickname) {
        setIsOwn(true);
      }
      // console.log(Juser.userNickname);
    }
  };

  const getProfileImg = async () => {
    const response = await getUserProfile(nickname);
    if (response) {
      // 이미지등록
      // setImgSrc(defaultImg);
    }
  };

  const handleModifyClick = () => {
    modComment();
    setIsDisabled(false);
  };

  const modComment = async () => {
    const body = {
      commentId: id,
      commentDescription: content,
    };
    const result = await modifyComment(body);
    console.log(result);
  };

  const handleCancelClick = () => {
    setIsDisabled(true);
  };
  const handleModifyCompleteClick = () => {
    //api 호출
    setIsDisabled(true);
  };

  useEffect(() => {
    checkUser();
    getProfileImg();
  }, []);

  // 프로필 가져오는 api

  return (
    <div className={cx('inner-container')}>
      <div className={cx('comment-header')}>
        <div className={cx('comment-info')}>
          <Avatar src={imgSrc} />
          <div className={cx('sub-info')}>
            <H4>{nickname}</H4>
            <Span>{date}</Span>
          </div>
        </div>
        <div className={cx('button-wrap')}>
          {isOwn && isDisabled ? (
            <div className={cx('buttons')}>
              <CustomButton
                src={editIcon}
                color="yellow"
                size="small"
                onClick={handleModifyClick}
              >
                수정
              </CustomButton>
              <CustomButton
                src={deleteIcon}
                size="small"
                onClick={handleDeleteClick}
              >
                삭제
              </CustomButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className={cx('comment-form')}>
        <Textarea value={content} disabled={isDisabled} />
        {!isDisabled ? (
          <div className={cx('modify-completeBtn')}>
            <div className={cx('buttons')}>
              <CustomButton
                src={editIcon}
                color="yellow"
                size="small"
                onClick={handleModifyCompleteClick}
              >
                수정완료
              </CustomButton>
              <CustomButton
                src={deleteIcon}
                size="small"
                onClick={handleCancelClick}
              >
                취소
              </CustomButton>
            </div>
          </div>
        ) : null}
        {/* <Input value={content} /> */}
        {/* value={content} /> */}
      </div>
    </div>
  );
};

export default Comment;
