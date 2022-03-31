import React from 'react';
import UserProfile from 'containers/ProfilePage/UserProfile/UserProfile';
import ProfileDetail from 'containers/ProfilePage/ProfileDetail/ProfileDetail';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import Avatar from 'assets/theme/Avatar/Avatar';
interface ProfilePageProps {
  focus: number;
}
const Mypage = ({ focus }: ProfilePageProps) => {
  return (
    <div>
      <UserProfile />
      {focus === 1 ? (
        <div>
          <ProfileDetail focus={focus} />
        </div>
      ) : focus === 2 ? (
        <ProfileDetail focus={focus} />
      ) : focus === 3 ? (
        <ProfileDetail focus={focus} />
      ) : null}
    </div>
  );
};

export default Mypage;
