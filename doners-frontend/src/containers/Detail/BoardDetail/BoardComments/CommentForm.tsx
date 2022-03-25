import Button from 'assets/theme/Button/Button';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './CommentForm.module.scss';

const cx = classNames.bind(styles);
const BoardComments = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('comments-count')}>
            <H3>댓글</H3>
            <H3 color="red">23</H3>
          </div>
          <form className={cx('comment-form')}>
            <textarea
              className={cx('comment-input')}
              placeholder="댓글을 작성해주세요"
            />
            <div className={cx('comment-registBtn')}>
              <Button color="secondary" fullWidth>
                댓글 등록
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BoardComments;
