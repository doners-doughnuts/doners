import classNames from 'classnames/bind';
import EventBanner from 'components/EventBanner/EventBanner';
import EventTab from 'components/EventTab/EventTab';
import { useState } from 'react';
import styles from './PopularMembership.module.scss';
const cx = classNames.bind(styles);

const PopularMembership = () => {
  const [selector, setSelector] = useState(1);

  const onClick = (id: number) => {
    setSelector(id);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            <div className={cx('title-wrap')}>
              <p className={cx('title')}>
                지금 HOT한 혜택! 가장 인기있는 혜택 정보
              </p>
            </div>
            <div className={cx('event-items')}>
              <ul className={cx('tab-list')}>
                <li
                  className={cx({
                    'is-active': selector === 1,
                  })}
                  onClick={() => onClick(1)}
                >
                  <EventTab
                    src="https://scm-cdn.tworld.co.kr/img/group-img/1629945075635/logo-normal-wavve@3x.png"
                    title="wavve 구독"
                  />
                </li>
                <li
                  className={cx({
                    'is-active': selector === 2,
                  })}
                  onClick={() => onClick(2)}
                >
                  <EventTab
                    src="https://scm-cdn.tworld.co.kr/img/group-img/1629967256933/logo-normal-flo@3x.png"
                    title="FLO 구독"
                  />
                </li>
                <li
                  className={cx({
                    'is-active': selector === 3,
                  })}
                  onClick={() => onClick(3)}
                >
                  <EventTab
                    src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/77/Tmap_logo1.png"
                    title="TMAP 플러스 구독"
                  />
                </li>
                <li
                  className={cx({
                    'is-active': selector === 4,
                  })}
                  onClick={() => onClick(4)}
                >
                  <EventTab
                    src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/2382/icon2-1_1.png"
                    title="원스토리 패스 구독"
                  />
                </li>
                <li
                  className={cx({
                    'is-active': selector === 5,
                  })}
                  onClick={() => onClick(5)}
                >
                  <EventTab
                    src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/307/xbox Icon1.png"
                    title="게임패스 얼티밋 구독"
                  />
                </li>
              </ul>
              {selector === 1 ? (
                <EventBanner
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1638428781004/웨이브-인기-PC.jpg"
                  title="wavve 구독"
                  sub_title="월 7,900 원 ~"
                />
              ) : selector === 2 ? (
                <EventBanner
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1629953238759/02 인기 구독.jpg"
                  title="FLO 구독"
                  sub_title="월 7,600 원 ~"
                />
              ) : selector === 3 ? (
                <EventBanner
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1629953378362/05 인기구독.jpg"
                  title="TMAP 플러스 구독"
                  sub_title="월 7,000 원 ~"
                />
              ) : selector === 4 ? (
                <EventBanner
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1638279399080/원스토리-랭킹-PC.jpg"
                  title="원스토리 패스 구독"
                  sub_title="월 7,900 원 ~</"
                />
              ) : selector === 5 ? (
                <EventBanner
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1632878960127/06 인기 구독.jpg"
                  title="게임패스 얼티밋 구독"
                  sub_title="월 11,900 원 ~</"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopularMembership;
