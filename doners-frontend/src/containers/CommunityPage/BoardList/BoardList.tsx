import Button from 'assets/theme/Button/Button';
import classNames from 'classnames/bind';
import BoardListItem from 'components/BoardListItem/BoardListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoardList } from 'services/api/Board';
import styles from './BoardList.module.scss';

const cx = classNames.bind(styles);

const BoardList = () => {
  const [sequence, setSequence] = useState(1);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const response = await getBoardList(sequence);
    console.log(response);
  };

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('btn-row')}>
            <div className={cx('btn')}>
              <Link to="write">
                <Button color="secondary" size="small" fullWidth>
                  글 작성
                </Button>
              </Link>
            </div>
          </div>
          <Link to="1">
            <BoardListItem />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BoardList;
