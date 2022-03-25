import BoardList from 'containers/CommunityPage/BoardList/BoardList';
import AdditionalMembership from 'containers/CommunityPage/Membership/AdditionalMembership/AdditionalMembership';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';

interface CommunityPageProps {
  focus: number;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ focus }) => {
  return (
    <>
      <CommunityTab focus={focus} />
      {focus === 1 ? (
        <>
          <PopularMembership />
          <AdditionalMembership />
        </>
      ) : focus === 3 ? (
        <BoardList />
      ) : null}
    </>
  );
};

export default CommunityPage;
