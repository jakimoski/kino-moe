import React from "react";
import Image from "next/image";
import "./SmallComment.scss";
import profileImage from "@public/assets/icons/profile_img.png";

type SmallCommentComponentProps = {
  image?: string;
  text: string;
  username: string;
};

const ICON_HEIGHT = 40;
const ICON_WIDTH = 40;

function SmallCommentComponent({
  image,
  text,
  username,
}: SmallCommentComponentProps) {
  return (
    <div className="small-comments">
      <div className="small-comments__user">
        <Image
          src={image ? image : profileImage}
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
          alt={`user-name`}
          sizes="100vw"
        ></Image>
        <p>{username}:</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default SmallCommentComponent;
