import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H4 from 'assets/theme/Typography/H4/H4';
import Span from 'assets/theme/Typography/Span/Span';
import P from 'assets/theme/Typography/P/P';
import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';

const cx = classNames.bind(styles);

const Comment = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            <div className={cx('comment-header')}>
              <div className={cx('comment-info')}>
                <Avatar size="small" />
                <div className={cx('sub-info')}>
                  <H4>한지우</H4>
                  <Span>2022.03.21 17:24</Span>
                </div>
              </div>
              <div className={cx('button-wrap')}>
                <div className={cx('buttons')}>
                  <CustomButton src={editIcon} color="yellow" size="small">
                    수정
                  </CustomButton>
                  <CustomButton src={deleteIcon} size="small">
                    삭제
                  </CustomButton>
                </div>
              </div>
            </div>
            <div>
              <P>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Venenatis, aenean turpis phasellus quis aliquet tincidunt.
                Vulputate sodales sit vel aliquam. Ut amet, egestas a posuere
                ullamcorper neque, in in. Facilisis dis interdum sagittis diam
                sit congue faucibus.
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
