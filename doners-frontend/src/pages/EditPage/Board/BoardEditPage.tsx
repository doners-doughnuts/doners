import BoardEditor from 'containers/BoardEditor/BoardEditor';
import styles from '../../page.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type EditType = {
  modify?: boolean;
};
const BoardEditPage = ({ modify }: EditType) => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <BoardEditor modify={modify} />
        </div>
      </div>
    </section>
  );
};

export default BoardEditPage;
