import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './AdditionalMembership.module.scss';
const cx = classNames.bind(styles);

const AdditionalMembership = () => {
  const data = [
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645716230005/39_lacha_icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645716227049/39_lacha_PC_home-passall-ver1_700x242.jpg',
        '라차 구독',
        'KTX, 숙박, 항공 할인 혜택 \n 매달 5천 원 적립금 지급 및 KTX 최대 40% 적립',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715420862/%EB%91%90%EC%B0%9C%EB%96%A1%EC%B0%B8_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715407846/%EB%91%90%EC%B0%9C%EB%96%A1%EC%B0%B8_%EB%A9%94%EC%9D%B81_%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80_PC_700x242.jpg',
        '두찜과 떡참 구독',
        '두찜/떡참 주문 시 사용하실 수 있는 10,000원 할인 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715621098/%EC%B9%B4%ED%8E%98%EB%B0%95%EC%8A%A4_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715608601/%EC%B9%B4%ED%8E%98%EB%B0%95%EC%8A%A4_%EB%A9%94%EC%9D%B81_%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80_PC_700x242.jpg',
        '카페박스 구독',
        '똑똑한 나만의 커피 구독 카페박스 커피 구독 15,000원 할인!',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691326531/logo-%EB%A1%AF%EB%8D%B0%EC%8A%88%ED%8D%BC-line.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691316430/%EB%A1%AF%EB%8D%B0%EC%8A%88%ED%8D%BC-%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%B6%94%EC%B2%9C-PC.jpg',
        '롯데슈퍼프레시 구독',
        '5,000원권 할인 쿠폰 매달 4장 (총 20,000원 혜택)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691516227/41_skstoa_icon_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691513254/41_skstoa_PC_home-passall-700x242.jpg',
        'SK스토아 구독',
        'TV쇼핑 20% 할인 쿠폰 2장 (최대 2만 원 혜택)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292453066/icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292449903/pc_%EB%B8%8C%EB%9E%9C%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B6%94%EC%B2%9C.jpg',
        '롯데시네마 구독',
        '롯데시네마 상영관에서 사용 가능한 최대 25,000원 혜택 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953030877/parisb%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953029039/15%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C%20(1).jpg',
        '파리바게뜨 구독',
        '1,000원 당 300원 할인 이용권 (1일 1회, 최대 1회 9,000원 / 월 3만원 할인)',
      ],
    ],
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629951891155/wavve%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638428734353/%EC%9B%A8%EC%9D%B4%EB%B8%8C-%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80-PC.jpg',
        'wavve 구독',
        '방송/영화/해외시리즈 무제한 감상 가능한 wavve 이용권과 전용 데이터(일부상품)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629951966436/flo%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629951938609/02%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        'FLO 구독',
        '내 취향의 음악 무제한 감상 가능한 FLO 이용권과 전용 데이터 (일부상품)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638938322830/icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638938313743/pc_%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80%EC%B6%94%EC%B2%9C_211202.jpg',
        '검은사막 모바일 구독',
        '화이트펄이 1,200개!',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952230662/xbox%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1632878336137/01-06%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '게임패스 얼티밋 구독',
        'Xbox 게임패스 얼티밋 이용권을 추가요금 5,900원에! (약 50% 할인)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292505404/%EC%9B%90%EC%8A%A4%ED%86%A0%EB%A6%AC-logo.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292490035/%EC%9B%90%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%B6%94%EC%B2%9C-PC.jpg',
        '원스토리 패스 구독',
        '웹소설, 웹툰, 장르소설, 책, 만화를 원스토리에서 한번에! 매달 원스토리 포인트 2천P까지!',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953067278/vcoloring%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953065601/04%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        'V 컬러링 앤 콘텐츠 구독',
        'V컬러링 이용권 매월 1,500원 상당 콘텐츠 이용권 4매',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952479988/spoon%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952477901/07%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '스푼 패스 구독',
        '취향 저격 오디오 플랫폼 스푼 50개 + 10 Like 아이템 3개',
      ],
    ],
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645716230005/39_lacha_icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645716227049/39_lacha_PC_home-passall-ver1_700x242.jpg',
        '라차 구독',
        'KTX, 숙박, 항공 할인 혜택 매달 5천 원 적립금 지급 및 KTX 최대 40% 적립',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691326531/logo-%EB%A1%AF%EB%8D%B0%EC%8A%88%ED%8D%BC-line.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691316430/%EB%A1%AF%EB%8D%B0%EC%8A%88%ED%8D%BC-%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%B6%94%EC%B2%9C-PC.jpg',
        '롯데슈퍼프레시 구독',
        '5,000원권 할인 쿠폰 매달 4장 (총 20,000원 혜택)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691516227/41_skstoa_icon_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691513254/41_skstoa_PC_home-passall-700x242.jpg',
        'SK스토아 구독',
        'TV쇼핑 20% 할인 쿠폰 2장 (최대 2만 원 혜택)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292453066/icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638292449903/pc_%EB%B8%8C%EB%9E%9C%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B6%94%EC%B2%9C.jpg',
        '롯데시네마 구독',
        '롯데시네마 상영관에서 사용 가능한 최대 25,000원 혜택 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635495374244/cj%EB%8D%94%EB%A7%88%EC%BC%932.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635434122407/CJ%EB%8D%94%EB%A7%88%EC%BC%93-%EB%B8%8C%EB%9E%9C%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B6%94%EC%B2%9Cpc3.jpg',
        'CJ더마켓 구독',
        '비비고, 햇반 등 CJ 인기 제품 쇼핑! 총 26,000원 이상의 할인 혜택',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635495391131/GS%ED%94%84%EB%A0%88%EC%89%AC%EB%AA%B0_pc.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635433991642/GS%ED%94%84%EB%A0%88%EC%8B%9C%EB%AA%B0-%EB%B8%8C%EB%9E%9C%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B6%94%EC%B2%9C2.jpg',
        'GS 프레시몰 구독',
        '365일 채소 최저가! 12,000원 장바구니 쿠폰, 무료 배송 쿠폰 1개',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635495356469/%EC%83%9D%ED%99%9C%EA%B3%B5%EC%9E%91%EC%86%8C_%EC%95%84%EC%9D%B4%EC%BD%98_%EC%88%98%EC%A0%95_%EC%86%8C%EC%85%9C%EA%B0%80%EC%9D%B4%EB%93%9C22p_pc_211029.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1635433562709/%EC%83%9D%ED%99%9C%EA%B3%B5%EC%9E%91%EC%86%8C-%EB%B8%8C%EB%9E%9C%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B6%94%EC%B2%9Cpc2.jpg',
        '생활공작소 구독',
        '아이부터 어른까지 사용 가능한 일상용품 총 2만원 상당의 혜택 제공',
      ],
    ],
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952344096/logo-line@3x.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952341706/05%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        'TMAP 플러스 베이직 구독',
        '주유, 주차, 택시, 렌터카 할인 등 15,000원 이상의 모빌리티 혜택',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952888196/shuttle%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952885823/10%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '모두의셔틀 구독',
        '집 앞에서 회사까지 한번에! 모두의셔틀 10,000원 쿠폰',
      ],
    ],
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715420862/%EB%91%90%EC%B0%9C%EB%96%A1%EC%B0%B8_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715407846/%EB%91%90%EC%B0%9C%EB%96%A1%EC%B0%B8_%EB%A9%94%EC%9D%B81_%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80_PC_700x242.jpg',
        '두찜과 떡참 구독',
        '두찜/떡참 주문 시 사용하실 수 있는 10,000원 할인 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715621098/%EC%B9%B4%ED%8E%98%EB%B0%95%EC%8A%A4_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EB%A1%9C%EA%B3%A0_2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645715608601/%EC%B9%B4%ED%8E%98%EB%B0%95%EC%8A%A4_%EB%A9%94%EC%9D%B81_%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80_PC_700x242.jpg',
        '카페박스 구독',
        '똑똑한 나만의 커피 구독 카페박스 커피 구독 15,000원 할인!',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953030877/parisb%20Icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953029039/15%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C%20(1).jpg',
        '파리바게뜨 구독',
        '1,000원 당 300원 할인 이용권 (1일 1회, 최대 1회 9,000원 / 월 3만원 할인)',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1632935399034/baskinrobins%20icon2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1632935396797/%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '배스킨라빈스 구독',
        '배스킨라빈스 매장에서 사용 가능한 7,000원 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1646319888667/%EA%B5%BD%EB%84%A4_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EC%9B%90%ED%98%95%EB%A1%9C%EA%B3%A02.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1638278074612/PC-%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%8C%A8%ED%82%A4%EC%A7%80%EC%B6%94%EC%B2%9C_%EA%B5%BD%EB%84%A4.jpg',
        '굽네치킨 구독',
        '굽네치킨 금액권 5천 원권 2장 홈페이지에서 배달비까지 한 번에 결제',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691230651/logo-%EB%A7%81%ED%8B%B0-line.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1642691217590/%EB%A7%81%ED%8B%B0-%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%B6%94%EC%B2%9C-PC.jpg',
        '링티 구독',
        '링티 3박스 + 보틀 상품 전용 25,000원 할인 쿠폰',
      ],
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1645716000330/%EB%B0%B0%EB%8B%AC%EC%9D%98%EB%AF%BC%EC%A1%B1_BI%EC%BA%90%EB%A6%AD%ED%84%B0logo2.png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629953162696/%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '배달의민족 구독',
        '5,000원 쿠폰 매월 1매 3,000원 쿠폰 매월 1매 (배민1)',
      ],
    ],
    [
      [
        'https://scm-cdn.tworld.co.kr/img/brandOper/1631179293703/aia%20icon_new_2%20(1).png',
        'https://scm-cdn.tworld.co.kr/img/brandOper/1629952571409/09%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        'AIA 바이탈리티 구독',
        '월12,000원 이상 혜택으로 건강한 습관을 형성해주는 과학적인 프로그램',
      ],
      [
        'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/brandOper/1626081381898/dobrain%20Icon2.png',
        'https://scm-stg-an2-s3-be-image.s3.ap-northeast-2.amazonaws.com/img/brandOper/1626747798457/08%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%8C%A8%ED%82%A4%EC%A7%80%20%EC%B6%94%EC%B2%9C.jpg',
        '두브레인 구독',
        '우리 아이만을 위한 특별한 두뇌교육 두브레인 월 이용요금 50% 할인',
      ],
    ],
  ];

  const [tab, setTab] = useState(0);
  const [content, setContent] = useState(0);

  const handleTab = (id: number) => {
    setTab(id);
    setContent(0);
  };

  const handleContent = (id: number) => {
    setContent(id);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-5')}>
          <div className={cx('basic-items')}>
            <span className={cx('badge')}>기본혜택</span>
            <ul className={cx('item-list')}>
              <li>
                <div className={cx('icon')}>
                  <img
                    src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-amazon-60.png"
                    alt="amazon"
                  />
                </div>
                <dl className={cx('info')}>
                  <dt>
                    Amazon
                    <br />
                    <strong className={cx('point')}>
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
                <div className={cx('icon')}>
                  <img
                    src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-11-60.png"
                    alt="11번가"
                  />
                </div>
                <dl className={cx('info')}>
                  <dt>
                    11번가
                    <br />
                    <strong className={cx('point')}>
                      포인트 3,000P + 5천원 쿠폰
                    </strong>
                  </dt>
                  <dd>모든 상품에, 현금처럼 쓰는!</dd>
                </dl>
              </li>
              <li>
                <div className={cx('icon')}>
                  <img
                    src="https://scm-cdn-fe.tworld.co.kr/img/logos/logo-googleone-60.png"
                    alt="google one"
                  />
                </div>
                <dl className={cx('info')}>
                  <dt>
                    Google One
                    <br />
                    <strong className={cx('point')}>멤버십 100GB</strong>
                  </dt>
                  <dd>소중한 자료를 모두 보관하세요</dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('col-lg-7')}>
          <div className={cx('additional-items')}>
            <span className={cx('badge')}>추가혜택</span>
            <div className={cx('tabs-wrap')}>
              <ul className={cx('tabs')}>
                <li
                  className={cx({
                    'is-active': tab === 0,
                  })}
                >
                  <button onClick={() => handleTab(0)}>전체</button>
                </li>
                <li
                  className={cx({
                    'is-active': tab === 1,
                  })}
                >
                  <button onClick={() => handleTab(1)}>콘텐츠</button>
                </li>
                <li
                  className={cx({
                    'is-active': tab === 2,
                  })}
                >
                  <button onClick={() => handleTab(2)}>생활/쇼핑 </button>
                </li>
                <li
                  className={cx({
                    'is-active': tab === 3,
                  })}
                >
                  <button onClick={() => handleTab(3)}>교통</button>
                </li>
                <li
                  className={cx({
                    'is-active': tab === 4,
                  })}
                >
                  <button onClick={() => handleTab(4)}>음식/디저트</button>
                </li>
                <li
                  className={cx({
                    'is-active': tab === 5,
                  })}
                >
                  <button onClick={() => handleTab(5)}>교육/보험</button>
                </li>
              </ul>
            </div>
            <div className={cx('tabs-contents')}>
              <div className={cx('slide-wrap')}>
                <div className={cx('slide-content')}>
                  <ul>
                    {data[tab].map((src, idx) => {
                      return (
                        <li key={idx} onClick={() => handleContent(idx)}>
                          <div
                            className={cx('slide-box', {
                              select: content === idx,
                            })}
                          >
                            <img src={src[0]} alt="logo" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className={cx('slide-info')}>
                <img src={data[tab][content][1]} alt="라차" />
                <div className={cx('info-text')}>
                  <p className={cx('title')}>{data[tab][content][2]}</p>
                  <p className={cx('desc')}>{data[tab][content][3]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdditionalMembership;
