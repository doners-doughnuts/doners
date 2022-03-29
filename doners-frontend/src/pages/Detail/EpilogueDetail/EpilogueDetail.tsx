import CommentForm from 'containers/Detail/BoardDetail/BoardComments/CommentForm';
import Comments from 'containers/Detail/BoardDetail/BoardComments/Comments';
import EpilogueContents from 'containers/Detail/EpilogueDetail/EpilogueContents/EpilogueContents';
import styles from '../../page.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EpilogueDetail = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <EpilogueContents />
          <CommentForm />
          {/* <Comments /> */}
        </div>
      </div>
    </section>
  );
};

export default EpilogueDetail;
