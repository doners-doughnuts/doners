import classNames from 'classnames/bind';
import styles from './BoardListItem.module.scss';
import { ReactComponent as FlagIcon } from 'assets/images/icon/flag.svg';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import { ReactComponent as CommentIcon } from 'assets/images/icon/comment.svg';
// import ListItemType from 'containers/CommunityPage/BoardList/BoardList';

const cx = classNames.bind(styles);

const BoardListItem = ({ data }: any) => {
  function formatDate(value: string) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  }
  return (
    <div className={cx('article-row')}>
      {data.communityCode === 'NOTICE' ? (
        <FlagIcon width={20} height={20} fill="#d64739" />
      ) : null}
      <div className={cx('article')}>
        <div className={cx('title')}>
          <h1>{data.communityTitle}</h1>
        </div>
        <div className={cx('sub')}>
          <div className={cx('sub-left')}>
            <span className={cx('sub-text')}>{data.communityWriter}</span>
            <span className={cx('sub-text', 'date')}>
              {formatDate(data.communityCreateTime)}
            </span>
          </div>
          <div className={cx('sub-right')}>
            <div className={cx('views')}>
              <ViewsIcon className={cx('icon')} fill="gray" />
              <span
                className={cx('sub-text')}
              >{`조회수: ${data.communityViews}`}</span>
            </div>
            <div className={cx('comment')}>
              <CommentIcon className={cx('icon')} fill="gray" />
              <span className={cx('sub-text')}>{`댓글: ${data.comments}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardListItem;
