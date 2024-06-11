import Image from "next/image";
import React from "react";
import "./avatar.scss";
import Placeholder from "@public/assets/icons/mingcute_user-4-line.png";

const Avatar = ({ image }: { image?: string }) => {
  return (
    <Image
      width={57}
      height={56}
      src={image ? image : Placeholder}
      alt="avatar-image"
      style={{ width: "100%", height: "100%" }}
    ></Image>
  );
};

export default Avatar;
