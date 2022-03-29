import classNames from 'classnames/bind';
import styles from './EpilogueDetailHeader.module.scss';
import Tag from 'assets/theme/Tag/Tag';
import H5 from 'assets/theme/Typography/H5/H5';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H1 from 'assets/theme/Typography/H1/H1';
import { Link } from 'react-router-dom';
import P from 'assets/theme/Typography/P/P';
import Avatar from 'assets/theme/Avatar/Avatar';
import Span from 'assets/theme/Typography/Span/Span';
import { ReactComponent as ClipIcon } from 'assets/images/icon/clip.svg';

const cx = classNames.bind(styles);
type headerType = {
  title: string;
  date: string;
  writer: string;
  src: string;
  onDelete: (...args: any[]) => void;
  onModify: (...args: any[]) => void;
};
const EpilogueDetailHeader = ({
  title,
  date,
  writer,
  src,
  onDelete,
  onModify,
}: headerType) => {
  return (
    <div className={cx('header')}>
      <div className={cx('thumbnail')}>
        <img src={src} alt="ex" />
        <div className={cx('clip-icon')}>
          <ClipIcon />
        </div>
      </div>
      <div className={cx('epilogue-info')}>
        <div className={cx('top')}>
          <Tag color="black">Category</Tag>
          <div className={cx('button-wrap')}>
            <div className={cx('buttons')}>
              <CustomButton
                src={editIcon}
                color="yellow"
                shadow
                size="small"
                onClick={onModify}
              >
                수정
              </CustomButton>
              <CustomButton
                src={deleteIcon}
                shadow
                size="small"
                onClick={onDelete}
              >
                삭제
              </CustomButton>
            </div>
          </div>
        </div>
        <div>
          <H1>{title}</H1>
          <div className={cx('donation-info')}>
            <H5>모금 진행 기간 : 21/12/24 ~ 22/03/01</H5>
            <Link to="">
              <div className={cx('detail_link')}>
                <Span color="green">기부 상세 보기</Span>
              </div>
            </Link>
          </div>
          <div className={cx('user-info')}>
            <Avatar />
            <div className={cx('name')}>
              <P>{writer}</P>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpilogueDetailHeader;
