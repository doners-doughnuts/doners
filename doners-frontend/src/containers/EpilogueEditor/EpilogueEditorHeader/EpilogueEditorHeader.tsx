import Avatar from 'assets/theme/Avatar/Avatar';
import Tag from 'assets/theme/Tag/Tag';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './EpilogueEditorHeader.module.scss';
import { ReactComponent as ImageIcon } from 'assets/images/icon/image.svg';

const cx = classNames.bind(styles);

const EpilogueEditorHeader = () => {
  return (
    <div className={cx('header')}>
      <div className={cx('info')}>
        <div className={cx('user-info')}>
          <Avatar />
          <div className={cx('name')}>
            <P>이학성</P>
          </div>
        </div>
        <div className={cx('donation-info')}>
          <div className={cx('category-title')}>
            <div className={cx('category')}>
              <Tag color="black">CATEGORY</Tag>
            </div>
            <H4>모금제목</H4>
          </div>
          <H4>모금 진행 기간 : 21/12/24 ~ 22/03/01</H4>
          <Link to="">
            <div className={cx('detail_link')}>
              <P color="green">기부 상세 보기</P>
            </div>
          </Link>
        </div>
      </div>

      <div className={cx('thumbnail')}>
        <div className={cx('default')}>
          <ImageIcon width={42} height={42} />
          <H4 color="blue">이미지를 업로드하세요.</H4>
          <P color="gray">여기를 클릭하거나 파일을 마우스로 끌어보세요.</P>
        </div>
        {/* <img src={src} alt="ex" /> */}
      </div>
    </div>
  );
};

export default EpilogueEditorHeader;
