import BoardList from 'containers/CommunityPage/BoardList/BoardList';
import Epilogue from 'containers/CommunityPage/Epilogue/Epilogue';
import AdditionalMembership from 'containers/CommunityPage/Membership/AdditionalMembership/AdditionalMembership';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import styles from '../page.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface CommunityPageProps {
  focus: number;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ focus }) => {
  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <CommunityTab focus={focus} />
          {focus === 1 ? (
            <>
              <PopularMembership />
              <AdditionalMembership />
            </>
          ) : focus === 2 ? (
            <Epilogue />
          ) : focus === 3 ? (
            <BoardList />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CommunityPage;
