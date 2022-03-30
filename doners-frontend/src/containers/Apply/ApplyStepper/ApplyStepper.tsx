import { type } from '@testing-library/user-event/dist/type';
import Steppers from 'assets/theme/Stepper/Stepper';
import classNames from 'classnames/bind';
import Comment from 'components/Comment/Comment';
import { Step, Stepper } from 'react-form-stepper';
import styles from './ApplyStepper.module.scss';

const cx = classNames.bind(styles);

type applyStepType = {
  applyStep: number;
};

const ApplyStepper = ({ applyStep }: applyStepType) => {
  const titles = ['사용자 정보', '기부 사유', '기부금 설정'];
  return (
    <section className={cx('container')}>
      <Stepper activeStep={applyStep}>
        {titles.map((title) => (
          <Step label={title} />
        ))}
      </Stepper>
    </section>
  );
};

export default ApplyStepper;
