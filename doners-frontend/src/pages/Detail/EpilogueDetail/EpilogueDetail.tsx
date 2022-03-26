import CommentForm from 'containers/Detail/BoardDetail/BoardComments/CommentForm';
import Comments from 'containers/Detail/BoardDetail/BoardComments/Comments';
import BoardContents from 'containers/Detail/BoardDetail/BoardContents/BoardContents';

const EpilogueDetail = () => {
  return (
    <>
      <BoardContents />
      <CommentForm />
      <Comments />
    </>
  );
};

export default EpilogueDetail;
