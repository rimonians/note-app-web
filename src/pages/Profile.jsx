import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Shared/Loading";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileImageUpdateModal from "../components/Profile/ProfileImageUpdateModal";
import ProfileInfoUpdateModal from "../components/Profile/ProfileInfoUpdateModal";

const Profile = () => {
  const { loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <ProfileHeader />
      <ProfileInfo />
      <ProfileImageUpdateModal />
      <ProfileInfoUpdateModal />
    </div>
  );
};

export default Profile;
