import AdditionalMembership from 'containers/CommunityPage/Membership/AdditionalMembership/AdditionalMembership';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import { useRef, useState } from 'react';
import styles from './CommunityPage.module.css';

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
      ) : null}
    </>
  );
};

export default CommunityPage;
