import React from "react";
import "./ProfileAvatar.scss";
import Image, { StaticImageData } from "next/image";
import ProfileImage from "@public/assets/icons/profile_img.png";
import badge1 from "@public/assets/icons/ph_medal.png";
import badge2 from "@public/assets/icons/simple-icons_openbadges.png";
import badge3 from "@public/assets/icons/solar_medal-star-broken.png";
import badge4 from "@public/assets/icons/tabler_badges.png";
import UserProfileAvatar from "./UserProfileAvatar";
import Chart from "../ChartComponent/Chart";
import { PostType, TMovie } from "@/types/types";

const ICON_WIDTH = 50;
const ICON_HEIGHT = 50;

type ProfileAvatarProps = {
  email: string | undefined;
  userName?: string | null;
  image?: string | StaticImageData | null;
  bio?: string | null;
  cultures?: string[];
  interests?: string[];
  preferences?: string[];
  recommendations?: string[];
  showMeAround?: boolean;
  accountType: string | undefined;
  Post?: PostType[];
  watchLists?: TMovie[];
};

function ProfileAvatar({
  email,
  userName,
  accountType,
  image,
  bio,
}: ProfileAvatarProps) {
  return (
    <div className="profile-avatar">
      <UserProfileAvatar
        styleClass="profile-avatar__image"
        ProfileImage={image ? image : ProfileImage}
        type={accountType ? accountType : "Viewer"}
      />

      <h3 className="profile-avatar__name">{userName ? userName : email}</h3>
      <p className="profile-avatar__type">
        {accountType ? accountType : "Viewer"}
      </p>
      <div className="profile-avatar__bio">
        <h4 className="profile-avatar__title">Bio</h4>
        <p>{bio}</p>
      </div>

      <div className="profile-avatar__badges">
        <h4 className="profile-avatar__title">Badges</h4>
        <div className="profile-avatar__badges-wrapper">
          <Image
            className="profile-avatar__badge"
            src={badge1}
            alt="badge1"
            width={50}
            height={50}
          />
          <Image
            className="profile-avatar__badge"
            src={badge2}
            alt="badge2"
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
          />
          <Image
            className="profile-avatar__badge"
            src={badge3}
            alt="badge3"
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
          />
          <Image
            className="profile-avatar__badge"
            src={badge4}
            alt="badge3"
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
          />
        </div>
      </div>
      <div className="chart-wrapper">
        <Chart
          title="Community"
          percentage={80}
          total="125"
          direction="column"
        />
        <Chart
          title="Discussions"
          percentage={20}
          total="10"
          direction="column"
        />
      </div>
    </div>
  );
}

export default ProfileAvatar;
