import RoundedButton from 'assets/theme/Button/RoundedButton/RoundedButton';
import covid19 from 'assets/images/icon/covid19.svg';
import veteran from 'assets/images/icon/veteran.svg';
import singlemom from 'assets/images/icon/singlemom.svg';
import disease from 'assets/images/icon/disease.svg';

import classNames from 'classnames/bind';
import styles from './DonateListHeader.module.scss';
import H3 from 'assets/theme/Typography/H3/H3';
import P from 'assets/theme/Typography/P/P';
import H2 from 'assets/theme/Typography/H2/H2';

const cx = classNames.bind(styles);

const DonateListHeader = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('btn-wrap')}>
            <div className={cx('btn-row')}>
              <RoundedButton src={covid19} shadow active />
              <RoundedButton src={veteran} shadow />
              <RoundedButton src={singlemom} shadow />
              <RoundedButton src={disease} shadow />
            </div>
          </div>
          <div className={cx('title')}>
            <H2>코로나 19</H2>
            <P>코로나 모금 정보에 관한 내용입니다.</P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateListHeader;
