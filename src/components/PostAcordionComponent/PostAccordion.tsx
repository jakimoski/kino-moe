"use client";
import { useState } from "react";
import "./PostAccordion.scss";
import { AccordionBody } from "./AccordionBody";
import { PostType } from "@/types/types";

type PostAccordionProps = {
  posts: PostType[];
};

const PostAccordion = ({ posts }: PostAccordionProps) => {
  const [active, setActive] = useState(null);

  const handleToggle = (index: any) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="post-accordion">
      {posts.map((post, index) => {
        return (
          <AccordionBody
            key={index}
            active={active}
            handleToggle={handleToggle}
            id={post.id}
            header={post.title}
            text={post.body}
            likes={post.likes}
            dislikes={post.dislikes}
            userId={post.userId}
            postId={post.id}
            comments={post.comments}
            user={post.user}
          />
        );
      })}
    </div>
  );
};

export default PostAccordion;
