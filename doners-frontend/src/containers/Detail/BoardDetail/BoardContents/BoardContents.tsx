import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import classNames from 'classnames/bind';
import styles from './BoardContents.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import covid19 from 'assets/images/img-covid19-category.png';
import H1 from 'assets/theme/Typography/H1/H1';
import P from 'assets/theme/Typography/P/P';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import { ReactComponent as CommentIcon } from 'assets/images/icon/comment.svg';
import H3 from 'assets/theme/Typography/H3/H3';
import Avatar from 'assets/theme/Avatar/Avatar';

const cx = classNames.bind(styles);
const BoardContents = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            <header className={cx('article-header')}>
              <div className={cx('button-wrap')}>
                <div className={cx('buttons')}>
                  <CustomButton src={editIcon} color="yellow" shadow>
                    수정
                  </CustomButton>
                  <CustomButton src={deleteIcon} shadow>
                    삭제
                  </CustomButton>
                </div>
              </div>
              <H1>게시글 제목</H1>
              <div className={cx('info-wrap')}>
                <div className={cx('article-info')}>
                  <div>
                    <P color="gray">작성일 : 2022.03.20 15:25</P>
                    <div className={cx('sub-info')}>
                      <div className={cx('views')}>
                        <ViewsIcon className={cx('icon')} fill="gray" />
                        <P>조회수 3409</P>
                        {/* <span className={cx('sub-text')}>조회수 3409</span> */}
                      </div>
                      <div className={cx('comment')}>
                        <CommentIcon className={cx('icon')} fill="gray" />
                        <P>댓글 800</P>
                        {/* <span className={cx('sub-text')}>댓글 800</span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('author')}>
                  <Avatar />
                  <div className={cx('name')}>
                    <P>이학성</P>
                  </div>
                </div>
              </div>
            </header>
            <main className={cx('content')}>
              <H3>"덕분에 따뜻한 외투를 살 수 있었어요!"</H3>
              <P>
                안녕하세요·부산광역시 서구에 위치한 더불어 살아가는 건강하고
                아름다운 노후의 희망 파트너 부민 노인복지관입니다.
                카카오같이가치와 함께 2021년10월1일부터 10월27일까지 진행한
                '겨울이 더 서러운 독거노인의 따뜻한 선물' 모금은 목표 모금액
                2,000,000원이 100% 달성되어 겨울 방한 의류가 필요한 남성 어르신
                5명을 모시고 아울렛에서 직접 옷을 골라 잘 입으실 수 있도록
                도와드렸습니다.
              </P>
              <img src={covid19} alt="ex" width={500} />
              <H3>
                어르신에게 꼭 필요한 따뜻한 겨울외투를 보내주셔서 감사합니다.
              </H3>
              <P>
                2020년에도 ‘혹한기 방한 의류 지원’ 모금을 진행하였고 이 모금을
                통해 5명의 어르신에게 1인당 20만 원의 점퍼를 어르신이 직접
                고르고 구입하여 지금도 그 점퍼를 입고 복지관에 찾아와 주십니다.
                그 당시 20만 원이라는 금액은 적은 돈은 아니지만, 기능성 좋은
                방한 의류를 구입하기에는 다소 부족하여 올해는 5명의 어르신에게
                1인당 40만 원, 총 2,000,000원이라는 모금을 올렸습니다. 모금을
                올릴 때는 ‘이렇게 많은 돈을 기부해 주실까?’라고 걱정도
                했었습니다. 하지만 모금 기간이 종료도 되기도 전에 목표 모금액
                100% 달성되었고 어르신들은 따뜻한 의류를 살 수 있게 되었습니다.
                우리 부민 노인복지관 직원들은 2022년에도 우리 주변의 도움이
                필요한 이웃을 꼼꼼히 살펴보면 꼭 필요한 도움을 드릴 수 있도록
                노력하겠습니다. 부민노인복지관의 이웃과 함께 가는 길에
                카카오같이가치 기부자님도 함께 해주셔서 감사합니다. 2022년
                가정의 행복과 평안을 빕니다. 감사합니다.
              </P>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardContents;
