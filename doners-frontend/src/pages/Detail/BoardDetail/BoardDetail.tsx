import BoardContents from 'containers/Detail/BoardDetail/BoardContents/BoardContents';
import styles from '../../page.module.scss';
import classNames from 'classnames/bind';
import CommentsForm from 'components/CommentForm/CommentForm';

const cx = classNames.bind(styles);

const BoardDetail = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <BoardContents />
          <CommentsForm />
          {/* <Comments /> */}
        </div>
      </div>
    </section>
  );
};

export default BoardDetail;
