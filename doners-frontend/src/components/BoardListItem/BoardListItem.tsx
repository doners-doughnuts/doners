import classNames from 'classnames/bind';
import styles from './BoardListItem.module.scss';
import { ReactComponent as FlagIcon } from 'assets/images/icon/flag.svg';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import { ReactComponent as CommentIcon } from 'assets/images/icon/comment.svg';
const cx = classNames.bind(styles);

const BoardListItem = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('article-row')}>
            <FlagIcon width={20} height={20} fill="#d64739" />
            <div className={cx('article')}>
              <div className={cx('title')}>
                <h1>산불 피해 긴급모금 진행 안내</h1>
              </div>
              <div className={cx('sub')}>
                <div className={cx('sub-left')}>
                  <span className={cx('sub-text')}>관리자</span>
                  <span className={cx('sub-text')}>2022.03.10</span>
                </div>
                <div className={cx('sub-right')}>
                  <div className={cx('views')}>
                    <ViewsIcon className={cx('icon')} fill="gray" />
                    <span className={cx('sub-text')}>조회수 3409</span>
                  </div>
                  <div className={cx('comment')}>
                    <CommentIcon className={cx('icon')} fill="gray" />
                    <span className={cx('sub-text')}>댓글 800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardListItem;
