import BoardList from 'containers/CommunityPage/BoardList/BoardList';
import Epilogue from 'containers/CommunityPage/Epilogue/Epilogue';
import AdditionalMembership from 'containers/CommunityPage/Membership/AdditionalMembership/AdditionalMembership';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import styles from '../page.module.scss';
import classNames from 'classnames/bind';
import Discord from 'containers/CommunityPage/Discord/Discord';
import { isMembership } from 'services/blockchain/NftApi';
import { getWalletAccount } from 'utils/walletAddress';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

interface CommunityPageProps {
  focus: number;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ focus }) => {
  const navigate = useNavigate();

  useEffect(() => {
    isHaveMembership();
  }, []);

  const isHaveMembership = async () => {
    try {
      const account = await getWalletAccount();
      const exist = await isMembership(account);
      if (!exist) {
        toast.error('해당 페이지는 기부가 완료된 사람만 접근이 가능합니다.');
        navigate('/');
      }
    } catch (error) {
      toast.error('해당 페이지는 기부가 완료된 사람만 접근이 가능합니다.');
      navigate('/');
    }
  };

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-lg-12')}>
          <CommunityTab focus={focus} />
        </div>
      </div>
      {focus === 1 ? (
        <>
          <PopularMembership />
          <AdditionalMembership />
        </>
      ) : focus === 2 ? (
        <Epilogue />
      ) : focus === 3 ? (
        <BoardList />
      ) : focus === 4 ? (
        <Discord />
      ) : null}
    </section>
  );
};

export default CommunityPage;
