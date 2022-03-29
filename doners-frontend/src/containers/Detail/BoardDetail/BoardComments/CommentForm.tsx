import Button from 'assets/theme/Button/Button';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import Comment from 'components/Comment/Comment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import {
  getBoardComments,
  getEpilogueComments,
  registComment,
} from 'services/api/Comment';
import styles from './CommentForm.module.scss';

const cx = classNames.bind(styles);
type commentType = {
  commentCreateTime: string;
  commentDescription: string;
  commentId: string;
  nickname: string;
};

const CommentsForm = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const [id, setId] = useState('');
  const [paramName, setParamName] = useState('');

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const params = useParams();

  useEffect(() => {
    if (params.community_id) {
      setId(params.community_id);
      setParamName('communityId');
    } else if (params.epilogue_id) {
      setId(params.epilogue_id);
      setParamName('epilogueId');
    }
    console.log(paramName);
    console.log(id);
    getCommentsApi();
  }, [id]);

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
      [paramName]: id,
    };
    console.log(body);

    try {
      await registComment(body);
      setComment('');
      getCommentsApi();
    } catch (error) {}
  };

  const getCommentsApi = async () => {
    if (typeof id === 'string' && id !== '') {
      console.log(id);
      console.log(paramName);
      if (paramName === 'communityId') {
        const response = await getBoardComments(id);
        console.log(response);
        setCommentList(response.data.commentResponseDTOList);
      } else {
        const response = await getEpilogueComments(id);
        console.log(response);
        setCommentList(response.data.commentResponseDTOList);
      }
    }
  };
  // useEffect(() => {
  //   getCommentsApi();
  // }, []);

  const handleDelete = (id: string) => {
    setCommentList(commentList.filter((comment) => comment.commentId !== id));
  };
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
          return (
            <Comment
              key={data.commentId}
              id={data.commentId}
              date={data.commentCreateTime}
              content={data.commentDescription}
              nickname={data.nickname}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </>
  );
};

export default CommentsForm;
