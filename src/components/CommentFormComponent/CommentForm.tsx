"use client";
import "./CommentForm.scss";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import { TUser } from "@/types/types";
import { createPost } from "@/lib/actions";
import { useRouter } from "next/navigation";

function CommentForm() {
  const router = useRouter();
  const currentUser: TUser = JSON.parse(localStorage.getItem("user") || "{}");

  const newHandler = () => {
    router.push("/community");
  };

  return (
    <div className="comment-form-wrapper">
      <form action={createPost} className="comment-form">
        <h4>Create New Post</h4>
        <input type="hidden" name="userId" value={currentUser.id} />
        <input
          className="comment-form__input"
          type="text"
          name="title"
          placeholder="Post title..."
        />
        <textarea
          className="comment-form__input"
          name="body"
          id="comment"
          cols={60}
          rows={5}
          placeholder="Whats on your mind..."
        ></textarea>
        <MainButtonComponent handler={newHandler} customStyles="btn--sm">
          Post
        </MainButtonComponent>
      </form>
    </div>
  );
}

export default CommentForm;
