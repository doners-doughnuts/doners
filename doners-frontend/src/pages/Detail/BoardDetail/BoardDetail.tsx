import CommentForm from 'containers/Detail/BoardDetail/BoardComments/CommentForm';
import Comments from 'containers/Detail/BoardDetail/BoardComments/Comments';
import BoardContents from 'containers/Detail/BoardDetail/BoardContents/BoardContents';
import styles from '../../page.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BoardDetail = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <BoardContents />
          <CommentForm />
          {/* <Comments /> */}
        </div>
      </div>
    </section>
  );
};

export default BoardDetail;
