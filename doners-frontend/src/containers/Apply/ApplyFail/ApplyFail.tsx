import Button from 'assets/theme/Button/Button';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './ApplyFail.module.scss';
import H3 from 'assets/theme/Typography/H3/H3';
import { Link, useNavigate } from 'react-router-dom';
import Pointer from 'assets/images/apply-main-pointer.png';
import Charactor from 'assets/images/img-covid19-category.png';
const cx = classNames.bind(styles);

const ApplyFail = () => {
  const navigate = useNavigate();
  const previousPage = () => {
    navigate('/');
  };

  return (
    <div>
      <section className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12')}>
            <div className={cx('inner-container')}>
              <header className={cx('header')}>
                <div>모금 실패</div>
              </header>
              <main className={cx('content')}>
                <div>이미 진행중인 모금이 있거나, 신청한 모금이 있습니다.</div>
                <div>
                  <img className={cx('charactor')} src={Charactor} />
                  <img className={cx('pointer')} src={Pointer} />
                </div>
              </main>
              <footer className={cx('footer')}>
                <Button color="alternate" onClick={previousPage}>
                  홈으로 돌아가기
                </Button>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ApplyFail;
