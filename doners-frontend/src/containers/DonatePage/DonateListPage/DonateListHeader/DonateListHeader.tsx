import RoundedButton from 'assets/theme/Button/RoundedButton/RoundedButton';
import covid19 from 'assets/images/icon/covid19.svg';
import veteran from 'assets/images/icon/veteran.svg';
import singlemom from 'assets/images/icon/singlemom.svg';
import disease from 'assets/images/icon/disease.svg';
import soldier from 'assets/images/icon/soldier.svg';

import classNames from 'classnames/bind';
import styles from './DonateListHeader.module.scss';
import P from 'assets/theme/Typography/P/P';
import H2 from 'assets/theme/Typography/H2/H2';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

type headerType = {
  category: string;
  onClick: any;
};
const DonateListHeader = ({ category, onClick }: headerType) => {
  const [title, setTitle] = useState('');
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get('category');

  useEffect(() => {
    switch (category) {
      case '1':
        setTitle('코로나19 모금');
        break;
      case '2':
        setTitle('희귀질환 모금');
        break;
      case '3':
        setTitle('참전용사 모금');
        break;
      case '4':
        setTitle('미혼모/부 모금');
        break;
    }
  }, [category]);

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('btn-wrap')}>
            <div className={cx('btn-row')}>
              <RoundedButton
                src={covid19}
                shadow
                active={category_id === '1'}
                onClick={() => {
                  onClick('1');
                }}
              />
              <RoundedButton
                src={disease}
                shadow
                active={category_id === '2'}
                onClick={() => {
                  onClick('2');
                }}
              />
              <RoundedButton
                src={soldier}
                shadow
                active={category_id === '3'}
                onClick={() => {
                  onClick('3');
                }}
              />
              <RoundedButton
                src={singlemom}
                shadow
                active={category_id === '4'}
                onClick={() => {
                  onClick('4');
                }}
              />
            </div>
          </div>
          <div className={cx('title')}>
            <H2>{title}</H2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateListHeader;
