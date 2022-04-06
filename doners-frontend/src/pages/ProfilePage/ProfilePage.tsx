import React, { useEffect, useState } from 'react';
import UserProfile from 'containers/ProfilePage/UserProfile/UserProfile';
import ProfileDetail from 'containers/ProfilePage/ProfileDetail/ProfileDetail';
import PopularMembership from 'containers/CommunityPage/Membership/PopularMembership/PopularMembership';
import CommunityTab from 'containers/CommunityPage/Tab/CommunityTab';
import Avatar from 'assets/theme/Avatar/Avatar';
import { useParams } from 'react-router';
import { getUserAddress } from 'services/api/UserApi';

interface ProfilePageProps {
  focus: number;
}

const ProfilePage = ({ focus }: ProfilePageProps) => {
  const { nickname } = useParams();
  const [walletAddress, setWalletAddress] = useState();

  const getWalletAddress = async () => {
    const { data } = await getUserAddress(nickname!);
    // console.log(data.userAccount);
    setWalletAddress(data.userAccount);
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <div>
      <UserProfile nickname={nickname!} />
      {nickname && walletAddress ? (
        <ProfileDetail
          focus={focus}
          nickname={nickname!}
          walletAddress={walletAddress}
        />
      ) : null}
    </div>
  );
};

export default ProfilePage;
