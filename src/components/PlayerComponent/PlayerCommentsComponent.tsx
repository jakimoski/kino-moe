"use client";
import React, { useState } from "react";
import "./playercomponent.scss";
import Image from "next/image";
import CommentsIcon from "@public/assets/icons/wpf_chat.png";
import CommentsActive from "@public/assets/icons/wpf_chat_active.png";
import SmallCommentComponent from "../SmallCommentComponent/SmallCommentComponent";
import { truncateText } from "@/utils/helpers";
import ModalComment from "../ModalComponent/ModalComment";
import { createPortal } from "react-dom";

type commentsType = {
  id: string;
  userId: string;
  time: number;
  text: string;
  image: string;
  name: string;
};

type PlayerCommentsComponentProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  comments: commentsType[];
};

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;

function PlayerCommentsComponent({
  videoRef,
  comments,
}: PlayerCommentsComponentProps) {
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="video-player__comments">
      <button onClick={() => setShowModal(true)}>
        <Image
          src={showComments ? CommentsActive : CommentsIcon}
          alt="volume"
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
      </button>
      {showModal &&
        createPortal(
          <ModalComment onClose={() => setShowModal(false)}></ModalComment>,
          document.body
        )}
      <div className="video-player__comments__box ">
        {comments.map((comment) => {
          return videoRef?.current?.currentTime <= comment.time + 3 &&
            videoRef?.current?.currentTime >= comment.time - 3 ? (
            <SmallCommentComponent
              key={comment.id}
              text={truncateText(comment.text, 30)}
              image={comment.image}
              username={comment.name}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}

export default PlayerCommentsComponent;
