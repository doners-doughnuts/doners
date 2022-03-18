import { useRef, useState } from 'react';
import styles from './CommunityPage.module.css';

const CommunityPage = () => {
  const [selector, setSelector] = useState(1);

  const onClick = (id: number) => {
    setSelector(id);
  };
  return (
    <>
      <section className={styles['tab-item']}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <ul className={styles['community-tab']}>
              <li>
                <div className={styles['tab-item']}>
                  <span className={styles.on}>이벤트</span>
                </div>
              </li>
              <li>
                <div className={styles['tab-item']}>
                  <span>후기</span>
                </div>
              </li>
              <li>
                <div className={styles['tab-item']}>
                  <span>광장</span>
                </div>
              </li>
              <li>
                <div className={styles['tab-item']}>
                  <span>커뮤니티</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles['event-contents']}>
        <div className={`${styles['module-box']} ${styles.innerContainer}`}>
          <div className={styles.title}>
            <p>지금 HOT한 혜택! 가장 인기있는 혜택 정보</p>
          </div>
          <div className={styles['event-items']}>
            <ul className={styles['tab-list']}>
              <li onClick={() => onClick(1)}>
                <div className={styles['event-name']}>
                  <span className={styles.icon}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/group-img/1629945075635/logo-normal-wavve@3x.png"
                      alt="wavve"
                    />
                  </span>
                  <span>wavve 구독</span>
                </div>
              </li>
              <li onClick={() => onClick(2)}>
                <div className={styles['event-name']}>
                  <span className={styles.icon}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/group-img/1629967256933/logo-normal-flo@3x.png"
                      alt="flo "
                    />
                  </span>
                  <span>FLO 구독</span>
                </div>
              </li>
              <li onClick={() => onClick(3)}>
                <div className={styles['event-name']}>
                  <span className={styles.icon}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/77/Tmap_logo1.png"
                      alt="TMAP 플러스 베이직"
                    />
                  </span>
                  <span>TMAP 플러스 구독</span>
                </div>
              </li>
              <li onClick={() => onClick(4)}>
                <div className={styles['event-name']}>
                  <span className={styles.icon}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/2382/icon2-1_1.png"
                      alt="원스토리 패스"
                    />
                  </span>
                  <span>원스토리 패스 구독</span>
                </div>
              </li>
              <li onClick={() => onClick(5)}>
                <div className={styles['event-name']}>
                  <span className={styles.icon}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/ssp/contents/0003/307/xbox Icon1.png"
                      alt="게임패스 얼티밋"
                    />
                  </span>
                  <span>게임패스 얼티밋 구독</span>
                </div>
                {/* {selector === 5 ? (
                  <div className={styles.content}>
                    <img
                      src="https://scm-cdn.tworld.co.kr/img/brandRnk/1638428781004/웨이브-인기-PC.jpg"
                      alt="wavve event"
                    />

                    <div className={styles.info}>
                      <dl>
                        <dt>wavve 구독</dt>
                        <dd>월 7,900 원 ~</dd>
                        <dd className={styles.btn}>
                          <span className={styles.detailBtn}>자세히 보기</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                ) : null} */}
              </li>
            </ul>
            {selector === 1 ? (
              <div className={styles.content}>
                <img
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1638428781004/웨이브-인기-PC.jpg"
                  alt="wavve event"
                />

                <div className={styles.info}>
                  <dl className={styles.infoDetail}>
                    <dt>wavve 구독</dt>
                    <dd>월 7,900 원 ~</dd>
                  </dl>
                </div>
              </div>
            ) : selector === 2 ? (
              <div className={styles.content}>
                <img
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1629953238759/02 인기 구독.jpg"
                  alt="FLO 구독"
                />

                <div className={styles.info}>
                  <dl>
                    <dt>FLO 구독</dt>
                    <dd>월 7,600 원 ~</dd>
                  </dl>
                </div>
              </div>
            ) : selector === 3 ? (
              <div className={styles.content}>
                <img
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1629953378362/05 인기구독.jpg"
                  alt="TMAP 구독"
                />

                <div className={styles.info}>
                  <dl>
                    <dt>TMAP 플러스 구독</dt>
                    <dd>월 7,000 원 ~</dd>
                  </dl>
                </div>
              </div>
            ) : selector === 4 ? (
              <div className={styles.content}>
                <img
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1638279399080/원스토리-랭킹-PC.jpg"
                  alt="원스토리 패스 구독"
                />

                <div className={styles.info}>
                  <dl>
                    <dt>원스토리 패스 구독</dt>
                    <dd>월 7,900 원 ~</dd>
                  </dl>
                </div>
              </div>
            ) : selector === 5 ? (
              <div className={styles.content}>
                <img
                  src="https://scm-cdn.tworld.co.kr/img/brandRnk/1632878960127/06 인기 구독.jpg"
                  alt="게임패스 얼티밋 구독"
                />

                <div className={styles.info}>
                  <dl>
                    <dt>게임패스 얼티밋 구독</dt>
                    <dd>월 11,900 원 ~</dd>
                  </dl>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section>
        <div className={`${styles['module-box']} ${styles.innerContainer}`}>
          <div className={styles.title}>
            <p>추가적인 다양한 혜택!</p>
          </div>
          <div className={styles['benefit-items']}>
            <div className={styles['benefit-basic-item']}>
              <span className={styles.flag}>기본혜택</span>
              <ul className={styles['benefit-list']}>
                <li>
                  <span className={styles['benefit-icon']}>
                    <img
                      src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-amazon-60.png"
                      alt="amazon"
                    />
                  </span>
                  <dl className={styles['benefit-info']}>
                    <dt>
                      Amazon
                      <br />
                      <strong className={styles.point}>
                        해외직구 무료배송 + 1만원 할인
                      </strong>
                    </dt>
                    <dd>
                      수천 만개 이상 인기상품을,
                      <br />
                      구매 금액, 횟수 제한 없이!
                    </dd>
                  </dl>
                </li>
                <li>
                  <span className={styles['benefit-icon']}>
                    <img
                      src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-11-60.png"
                      alt="11번가"
                    />
                  </span>
                  <dl className={styles['benefit-info']}>
                    <dt>
                      11번가
                      <br />
                      <strong className={styles.point}>
                        포인트 3,000P + 5천원 쿠폰
                      </strong>
                    </dt>
                    <dd>모든 상품에, 현금처럼 쓰는!</dd>
                  </dl>
                </li>
                <li>
                  <span className={styles['benefit-icon']}>
                    <img
                      src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-googleone-60.png"
                      alt="google one"
                    />
                  </span>
                  <dl className={styles['benefit-info']}>
                    <dt>
                      Google One
                      <br />
                      <strong className={styles.point}>멤버십 100GB</strong>
                    </dt>
                    <dd>소중한 자료를 모두 보관하세요</dd>
                  </dl>
                </li>
              </ul>
            </div>
            <span className={styles['benefit-plus']}></span>
            <div className={styles['benefit-additional-item']}>
              <span className={styles.flag}>추가혜택</span>
              <div className={styles['benefit-tabs-wrap']}>
                <ul className={styles['benefit-tabs']}>
                  <li className={styles.on}>
                    <button>전체</button>
                  </li>
                  <li>
                    <button>콘텐츠</button>
                  </li>
                  <li>
                    <button>생활/쇼핑 </button>
                  </li>
                  <li>
                    <button>교통</button>
                  </li>
                  <li>
                    <button>음식/디저트</button>
                  </li>
                  <li>
                    <button>교육/보험</button>
                  </li>
                </ul>
              </div>
              <div className={styles['tabs-contents']}>
                <div className={styles['slide-wrap']}>
                  <div className={styles['slide-content']}>
                    <ul>
                      <li>
                        <div
                          className={`${styles['slide-box']} ${styles.select}`}
                        >
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1645716230005/39_lacha_icon2.png"
                            alt="lacha"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1645715420862/%EB%91%90%EC%B0%9C%EB%96%A1%EC%B0%B8_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png"
                            alt="떡참"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1645715621098/%EC%B9%B4%ED%8E%98%EB%B0%95%EC%8A%A4_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png"
                            alt="cafe box"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1642691326531/logo-%EB%A1%AF%EB%8D%B0%EC%8A%88%ED%8D%BC-line.png"
                            alt="롯데슈퍼"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1642691516227/41_skstoa_icon_2.png"
                            alt="sk스토어"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1638292453066/icon2.png"
                            alt="롯데시네마"
                          />
                        </div>
                      </li>
                      <li>
                        <div className={styles['slide-box']}>
                          <img
                            src="https://scm-cdn.tworld.co.kr/img/brandOper/1629953030877/parisb%20Icon2.png"
                            alt="파리바게트"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles['slide-info']}>
                  <img
                    src="https://scm-cdn.tworld.co.kr/img/brandOper/1645716227049/39_lacha_PC_home-passall-ver1_700x242.jpg"
                    alt="라차"
                  />
                  <div className={styles['info-text']}>
                    <p className={styles.title}>라차 구독</p>
                    <p className={styles.desc}>
                      KTX, 숙박, 항공 할인 혜택 <br />
                      매달 5천 원 적립금 지급 및 KTX 최대 40% 적립
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityPage;
