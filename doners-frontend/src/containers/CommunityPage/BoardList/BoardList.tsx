import Button from 'assets/theme/Button/Button';
import classNames from 'classnames/bind';
import BoardArticle from 'components/BoardListItem/BoardListItem';
import { Link } from 'react-router-dom';
import styles from './BoardList.module.scss';

const cx = classNames.bind(styles);

const BoardList = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('btn-row')}>
            <div className={cx('btn')}>
              <Button color="secondary" size="small" fullWidth>
                글 작성
              </Button>
            </div>
          </div>
          <Link to="1">
            <BoardArticle />
          </Link>
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
          <BoardArticle />
        </div>
      </div>
    </section>
  );
};

export default BoardList;
