import Button from 'assets/theme/Button/Button';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import Comment from 'components/Comment/Comment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getComments, registComment } from 'services/api/Comment';
import styles from './CommentForm.module.scss';

const cx = classNames.bind(styles);
type commentType = {
  commentCreateTime: string;
  commentDescription: string;
  commentId: string;
};

const BoardComments = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<commentType[]>([]);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { community_id } = useParams();

  const handleInput = () => {
    if (commentRef.current) {
      setComment(commentRef.current.value);
    }
  };
  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registCommentApi();
  };

  const registCommentApi = async () => {
    const body = {
      commentDescription: comment,
      communityId: community_id,
    };

    try {
      await registComment(body);
      setComment('');
      getCommentsApi();
    } catch (error) {}
  };

  const getCommentsApi = async () => {
    if (typeof community_id === 'string') {
      const response = await getComments(community_id);
      console.log(response.data);
      setCommentList(response.data.commentResponseDTOList);
    }
  };
  useEffect(() => {
    getCommentsApi();
  }, []);

  useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  return (
    <>
      <div className={cx('comments-count')}>
        <H3>댓글</H3>
        <H3 color="red">{String(commentList.length)}</H3>
      </div>
      <form className={cx('comment-form')}>
        <textarea
          className={cx('comment-input')}
          placeholder="댓글을 작성해주세요"
          ref={commentRef}
          value={comment}
          onChange={handleInput}
        />
        <div className={cx('comment-registBtn')}>
          <Button color="secondary" fullWidth onClick={handleCommentSubmit}>
            댓글 등록
          </Button>
        </div>
      </form>
      <div>
        {commentList.map((data) => {
          console.log(data);
          return (
            <Comment
              key={data.commentId}
              id={data.commentId}
              date={data.commentCreateTime}
              content={data.commentDescription}
            />
          );
        })}
      </div>
    </>
  );
};

export default BoardComments;
