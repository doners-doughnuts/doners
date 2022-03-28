import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import { deleteComments } from 'services/api/Comment';

const cx = classNames.bind(styles);
// type dataType = {

// }
const Comment = ({ id, date, content }: any) => {
  // const handleModifyClick = () => {};
  const handleDeleteClick = () => {
    delComment();
  };

  const delComment = async () => {
    const result = await deleteComments(id);
    console.log(result);
  };

  return (
    <div className={cx('inner-container')}>
      <div className={cx('comment-header')}>
        <div className={cx('comment-info')}>
          <Avatar size="small" />
          <div className={cx('sub-info')}>
            <H4>한지우</H4>
            <Span>{date}</Span>
          </div>
        </div>
        <div className={cx('button-wrap')}>
          <div className={cx('buttons')}>
            <CustomButton src={editIcon} color="yellow" size="small">
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
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Comment;
