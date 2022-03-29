import React from 'react';
import ProfileTab from 'containers/ProfilePage/Tab/ProfileTab';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import Avatar from 'assets/theme/Avatar/Avatar';
interface ProfilePageProps {
  focus: number;
}
const Mypage: React.FC<ProfilePageProps> = ({ focus }) => {
  return (
    <div>
      <>
        <Avatar />
        <ProfileTab focus={focus} />
        {focus === 1 ? (
          <>
            <PopularMembership />
          </>
        ) : focus === 2 ? (
          <div>
            <PopularMembership />
          </div>
        ) : focus === 3 ? (
          <div>ㅇㅇㅇ</div>
        ) : null}
      </>
    </div>
  );
};

export default Mypage;
