"use client";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import UserImage from "@public/assets/users/user1.png";
import LikeIcon from "@public/assets/icons/LikeIcon.png";
import DislikeIcon from "@public/assets/icons/DislikeIcon.png";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import revalidateCommunity, { createReply } from "@/lib/actions";
import { CommentType, TUser, UserType } from "@/types/types";
import chatIcon from "@public/assets/icons/wpf_chat-black.png";
import likeBlackIcon from "@public/assets/icons/like-black.png";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import ModalComment from "../ModalComponent/ModalComment";
import { createPortal } from "react-dom";

type AccordionItemProps = {
  active: number | null;
  handleToggle: (index: number) => void;
  id: number;
  text: string;
  header: string;
  likes: number;
  dislikes: number;
  userId: number;
  postId: number;
  comments: CommentType[];
  user: UserType;
};

export const AccordionBody = ({
  header,
  active,
  handleToggle,
  id,
  text,
  likes,
  dislikes,
  userId,
  postId,
  comments,
  user,
}: AccordionItemProps) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const commentFormRef = useRef<HTMLFormElement>(null);

  const currentUser: TUser = JSON.parse(localStorage.getItem("user") || "{}");

  const onLikeHandler = async (postId: number) => {
    const newLikes = likes + 1;
    await supabase.from("Post").update({ likes: newLikes }).eq("id", postId);
    revalidateCommunity();
  };

  const onLikeCommentHandler = async (postId: number, likes: number) => {
    const newLikes = likes + 1;
    await supabase.from("Comment").update({ likes: newLikes }).eq("id", postId);
    revalidateCommunity();
  };

  const onDislikeHandler = async (postId: number) => {
    const newDislikes = dislikes + 1;
    await supabase
      .from("Post")
      .update({ dislikes: newDislikes })
      .eq("id", postId);
    revalidateCommunity();
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    createReply(formData);

    e.currentTarget.reset();
  };

  return (
    <div className="accordion-card">
      <div className="accordion-card__header">
        <div
          className="accordion-card__post-title"
          onClick={() => handleToggle(id)}
        >
          <Link href={`/profile/${user.id.toString()}`}>
            <Image
              src={user.image ? user.image : UserImage}
              alt="profile-image"
              width={50}
              height={50}
            />
          </Link>
          <h2>{header}</h2>
        </div>
        <div className="accordion-card__post-likes">
          <button
            onClick={() => onLikeHandler(postId)}
            className="accordion-card__post-likes__button"
          >
            <Image src={LikeIcon} alt="like-icon" width={20} height={20} />
            {likes}
          </button>

          <button
            onClick={() => onDislikeHandler(postId)}
            className="accordion-card__post-likes__button"
          >
            <Image src={DislikeIcon} alt="like-icon" width={20} height={20} />
            {dislikes}
          </button>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl?.current?.scrollHeight ?? 0 }
            : { height: "0px" }
        }
      >
        <p className="accordion-card__post-body">{text}</p>
        <form
          ref={commentFormRef}
          className="accordion-card__form"
          onSubmit={(e) => handleCommentSubmit(e)}
          action={createReply}
        >
          <input type="hidden" name="userId" value={currentUser.id} />
          <input type="hidden" name="postId" value={postId} />
          <textarea name="content" placeholder="Leave a comment"></textarea>
          <MainButtonComponent type="submit" customStyles="btn--link">
            Post Comment
          </MainButtonComponent>
        </form>
        <div className="accordion-card__comment-section">
          <p className="accordion-card__comment-section__title">
            Comment Section
          </p>
          <div className="accordion-card__comment-wrapper">
            {comments.map((comment, index) => {
              return (
                <div key={index} className="accordion-card__comment">
                  <div className="accordion-card__single-comment">
                    <Link href={`/profile/${comment.user?.id.toString()}`}>
                      <Image
                        src={
                          comment.user?.image ? comment.user?.image : UserImage
                        }
                        alt={comment.user?.userName || comment.user?.email}
                        width={50}
                        height={50}
                        className="accordion-card__comment-image"
                      />
                    </Link>
                    <div className="accordion-card__comment-body">
                      <p className="accordion-card__comment-body__name">
                        {comment.user?.userName || comment.user?.email}
                      </p>
                      <p>{comment.content}</p>
                    </div>
                    <div className="accordion-card__post-likes">
                      <button onClick={() => setShowModal(true)}>
                        <Image
                          src={chatIcon}
                          alt="chat-icon"
                          width={30}
                          height={30}
                          className="accordion-card__comment-image"
                        />
                      </button>
                      {showModal &&
                        createPortal(
                          <ModalComment
                            onClose={() => setShowModal(false)}
                            postId={comment.id}
                            reply={true}
                          ></ModalComment>,
                          document.body
                        )}
                      <button
                        className="accordion-card__comment-likes__button"
                        onClick={() =>
                          onLikeCommentHandler(comment.id, comment.likes)
                        }
                      >
                        <Image
                          src={likeBlackIcon}
                          alt="like-icon"
                          width={20}
                          height={20}
                        />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                  {comment.Reply?.map((reply, index) => {
                    return (
                      <div
                        key={index}
                        className="accordion-card__comment--reply"
                      >
                        <div className="accordion-card__single-comment">
                          <div className="accordion-card__comment--reply__border"></div>
                          <Image
                            src={
                              reply.user?.image ? reply.user?.image : UserImage
                            }
                            alt={reply.user?.userName || reply.user?.email}
                            width={50}
                            height={50}
                          />
                          <div className="accordion-card__comment-body">
                            <span className="accordion-card__comment-body__name">
                              {reply.user?.userName}
                            </span>
                            <p>{reply.body}Reply</p>
                          </div>
                          <div className="accordion-card__post-likes">
                            <button>
                              <Image
                                src={chatIcon}
                                alt={
                                  comment.user?.userName || comment.user?.email
                                }
                                width={30}
                                height={30}
                                className="accordion-card__comment-image"
                              />
                            </button>

                            <button className="accordion-card__comment-likes__button">
                              <Image
                                src={likeBlackIcon}
                                alt="like-icon"
                                width={20}
                                height={20}
                              />
                              {reply.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
