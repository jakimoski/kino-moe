"use client";
import { useEffect, useState } from "react";
import "./Modal.scss";
import "./CommentForm.scss";
import { createPortal } from "react-dom";
import ExitIcon from "../../../public/assets/icons/exit-modal.png";
import Image from "next/image";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import { TUser } from "@/types/types";
import { supabase } from "@/lib/supabaseClient";
import revalidateCommunity from "@/lib/actions";

type ModalProps = {
  onClose: () => void;
  type?: string;
  postId?: number;
  reply?: boolean;
};

const ModalComment: React.FC<ModalProps> = ({
  onClose,
  type,
  postId,
  reply,
}: ModalProps) => {
  const currentUser: TUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [title, setTitle] = useState<string>("");
  const [content, setBody] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setTitleError("");
    setBodyError("");

    let valid = true;

    if (!content) {
      setBodyError("Body is required");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const { error } = await supabase
        .from(`${reply ? "Reply" : "Comment"}`)
        .insert({
          content,
          userId: currentUser.id,
          type: type ?? "movie",
          // postId: postId ?? 1,
          [reply ? "commentId" : "postId"]: postId,
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error inserting post:", error);
    }
    revalidateCommunity();
    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return createPortal(
    <section className={"modal-overlay"}>
      <div className={"modal-overlay"} onClick={() => onClose()}></div>
      <div className="modal__chat">
        <div className="modal__wrapper">
          <button className="modal__close-btn" onClick={() => onClose()}>
            <Image
              src={ExitIcon}
              alt="exit icon"
              width={20}
              height={18}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </button>
          <div className="comment-form-wrapper">
            <form action="" className="comment-form">
              <h3 className="comment-form__title">Comment</h3>

              <input type="hidden" name="userId" value={currentUser.id} />

              <p className="comment-form__error">{titleError}</p>
              <textarea
                className="comment-form__input"
                name="body"
                id="comment"
                onChange={(e) => setBody(e.target.value)}
                cols={60}
                rows={5}
                value={content}
                placeholder="Whats on your mind..."
              ></textarea>
              <p className="comment-form__error">{bodyError}</p>
              <MainButtonComponent
                type="submit"
                handler={onSubmit}
                customStyles="btn--sm"
              >
                Post
              </MainButtonComponent>
            </form>
          </div>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default ModalComment;
