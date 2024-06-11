import React from "react";
import Image, { StaticImageData } from "next/image";
import verifiedIcon from "@public/assets/icons/Main_Checkmark.png";
type UserProfileAvatarProps = {
  ProfileImage: string | StaticImageData;
  styleClass?: string;
  type?: string;
};

const ICON_WIDTH = 200;
const ICON_HEIGHT = 200;

function UserProfileAvatar({
  ProfileImage,
  styleClass,
  type,
}: UserProfileAvatarProps) {
  return (
    <div className="profile-avatar__wrapper">
      <Image
        className={styleClass}
        src={ProfileImage}
        alt="avatar"
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
        sizes="100vw"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      {type === "artist" && (
        <Image
          className="profile-avatar__verified"
          src={verifiedIcon}
          alt="avatar"
          width={70}
          height={70}
          sizes="100vw"
          style={{ width: "70px", height: "70px" }}
        />
      )}
    </div>
  );
}

export default UserProfileAvatar;
