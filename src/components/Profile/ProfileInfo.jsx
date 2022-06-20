import React from "react";
import { useSelector } from "react-redux";
import {
  IoCreateOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoMaleFemaleSharp,
  IoHomeOutline,
  IoPhonePortraitOutline,
  IoMailOpenOutline,
  IoArchiveOutline,
} from "react-icons/io5";

const ProfileInfo = () => (
  <div>
    <ProfileInfoHeading />
    <ProfileInfoDetails />
  </div>
);

const ProfileInfoHeading = () => (
  <div className="flex justify-between items-center mb-4">
    <p className="font-bold text-lg">Your Information</p>
    <label htmlFor="profileInfoUpdateModal">
      <IoCreateOutline className="text-2xl cursor-pointer" />
    </label>
  </div>
);

const ProfileInfoDetails = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <>
      {user && (
        <div className="space-y-4">
          <ProfileInfoDetailsItem
            Icon={IoPersonOutline}
            name="Username"
            value={user.username}
          />
          <ProfileInfoDetailsItem
            Icon={IoCalendarOutline}
            name="Date of Birth"
            value={user.dateOfBirth}
          />
          <ProfileInfoDetailsItem
            Icon={IoMaleFemaleSharp}
            name="Gender"
            value={user.gender}
          />
          <ProfileInfoDetailsItem
            Icon={IoHomeOutline}
            name="Address"
            value={user.address}
          />
          <ProfileInfoDetailsItem
            Icon={IoPhonePortraitOutline}
            name="Mobile"
            value={user.mobile}
          />
          <ProfileInfoDetailsItem
            Icon={IoMailOpenOutline}
            name="Email"
            value={user.email}
          />
          <ProfileInfoDetailsItem
            Icon={IoArchiveOutline}
            name="Join At"
            value={new Date(user.createdAt).toDateString()}
          />
        </div>
      )}
    </>
  );
};

const ProfileInfoDetailsItem = ({ Icon, name, value }) => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center space-x-2 shrink-0">
      <Icon className="text-primary" />
      <span className="text-primary font-bold">{name} : </span>
    </div>
    <p className="capitalize">{value ? value : "Not available"}</p>
  </div>
);

export default ProfileInfo;
