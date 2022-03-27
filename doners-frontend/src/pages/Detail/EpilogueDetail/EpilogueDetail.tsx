import CommentForm from 'containers/Detail/BoardDetail/BoardComments/CommentForm';
import Comments from 'containers/Detail/BoardDetail/BoardComments/Comments';
import EpilogueContents from 'containers/Detail/EpilogueDetail/EpilogueContents/EpilogueContents';

const EpilogueDetail = () => {
  return (
    <>
      <EpilogueContents />
      <CommentForm />
      <Comments />
    </>
  );
};

export default EpilogueDetail;
