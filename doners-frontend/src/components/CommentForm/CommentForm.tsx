import Button from 'assets/theme/Button/Button';
import Textarea from 'assets/theme/Textarea/Textarea';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import Comment from 'components/Comment/Comment';
import { ChangeEvent, useEffect, useState } from 'react';
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
type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

const CommentsForm = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const [id, setId] = useState('');
  const [paramName, setParamName] = useState('');

  const params = useParams();

  useEffect(() => {
    if (params.community_id) {
      setId(params.community_id);
      setParamName('communityId');
    } else if (params.epilogue_id) {
      setId(params.epilogue_id);
      setParamName('epilogueId');
    }
    getCommentsApi();
  }, [id]);

  const handleInput = (event: TextareaChangeEvent) => {
    setComment(event.currentTarget.value);
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

    await registComment(body);
    setComment('');
    getCommentsApi();
  };

  const getCommentsApi = async () => {
    if (typeof id === 'string' && id !== '') {
      if (paramName === 'communityId') {
        const response = await getBoardComments(id);
        setCommentList(response.data.commentResponseDTOList);
      } else {
        const response = await getEpilogueComments(id);
        setCommentList(response.data.commentResponseDTOList);
      }
    }
  };

  const handleDelete = (id: string) => {
    setCommentList(commentList.filter((comment) => comment.commentId !== id));
  };

  const handleModify = () => {
    getCommentsApi();
  };

  return (
    <>
      <div className={cx('comments-count')}>
        <H3>댓글</H3>
        <H3 color="red">{String(commentList.length)}</H3>
      </div>
      <form className={cx('comment-form')}>
        <Textarea
          placeholder="댓글을 작성해주세요"
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
              onModify={handleModify}
            />
          );
        })}
      </div>
    </>
  );
};

export default CommentsForm;
