import classNames from 'classnames/bind';
import Comment from 'components/Comment/Comment';
import styles from './CommentForm.module.scss';

const cx = classNames.bind(styles);
const Comments = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </section>
  );
};

export default Comments;
