import classNames from 'classnames/bind';
import styles from './LandingHero.module.scss';
import Button from 'assets/theme/Button/Button';
import character from 'assets/images/character-angel.png';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import H1 from 'assets/theme/Typography/H1/H1';

const cx = classNames.bind(styles);
const LandingHero = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/category');
  };
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <div className={cx('inner-container')}>
            <div className={cx('text-wrapper')}>
              <h1 className={cx('slogan')}>
                Donate & Collect <br />
                extraordinary <br />
                {/* // TODO 리팩토링 */}
                <span>doughnut</span> NFTs
              </h1>
              <div className={cx('description')}>
                <span>
                  Donate to the ones that are in need. <br />
                  Doughnuts are on us.
                </span>
              </div>
            </div>
            <div className={cx('buttonRow')}>
              <Button color="primary" shadow fullWidth onClick={onClick}>
                기부하기
              </Button>
            </div>
            <div className={cx('character')}>
              <img
                src={character}
                alt="character"
                className={cx('character-main')}
              />
            </div>
            <ToastContainer
              position="top-center"
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
