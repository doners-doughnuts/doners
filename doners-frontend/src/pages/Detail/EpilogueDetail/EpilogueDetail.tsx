import EpilogueContents from 'containers/Detail/EpilogueDetail/EpilogueContents/EpilogueContents';
import styles from '../../page.module.scss';
import classNames from 'classnames/bind';
import CommentsForm from 'components/CommentForm/CommentForm';

const cx = classNames.bind(styles);

const EpilogueDetail = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <EpilogueContents />
          <CommentsForm />
          {/* <Comments /> */}
        </div>
      </div>
    </section>
  );
};

export default EpilogueDetail;
