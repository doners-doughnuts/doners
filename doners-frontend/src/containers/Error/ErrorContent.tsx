import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import classNames from 'classnames/bind';
import styles from './ErrorContent.module.scss';
import { Link } from 'react-router-dom';
import character from 'assets/images/img-rare-diseases-category.png';
import Button from 'assets/theme/Button/Button';
import H1 from 'assets/theme/Typography/H1/H1';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
interface ErrorProps {
  errorcode: string;
  message: string;
}
const ErrorContent = ({ errorcode, message }: ErrorProps) => {
  // console.log(_applicationList)

  return (
    <section className={cx('container')}>
      <div className={cx('inner-container')}>
        <div className={cx('header')}>
          <H1>{errorcode}</H1>
        </div>
        <div className={cx('contents')}>
          {message.split('\n').map((txt) => (
            <>
              {txt}
              <br />
            </>
          ))}
        </div>
        <div className={cx('homebtn')}>
          <Link to={'/'}>
            <Button color="primary">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
      <div className={cx('img')}>
        <img src={character} />
      </div>
    </section>
  );
};

export default ErrorContent;
