import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/img/avatar.png";
import { IoIosCloudUpload } from "react-icons/io";
import { profileImagePath } from "../../api/client";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar section */}
      <div className="avatar">
        <div className="w-40 mask mask-squircle">
          <img
            src={
              user.profileImage
                ? `${profileImagePath}${user.profileImage}`
                : avatar
            }
          />
        </div>
        <label htmlFor="profileImageUpdateModal">
          <IoIosCloudUpload className="absolute bottom-0 right-0 p-1 h-8 w-8 bg-primary text-white cursor-pointer rounded-full" />
        </label>
      </div>
      {/* Name & bio section */}
      <div className="text-center space-x-2">
        <p className="font-bold text-2xl text-primary">{user.username}</p>
        {user.bio && <p className="text-secondary">{user.bio}</p>}
      </div>
    </div>
  );
};

export default ProfileHeader;
