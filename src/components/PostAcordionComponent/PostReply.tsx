// import Image from "next/image";

// function PostReply() {
//   return (
//     <div
//     key={index}
//     className="accordion-card__comment--reply"
//   >
//     <div className="accordion-card__single-comment">
//       <div className="accordion-card__comment--reply__border"></div>
//       <Image
//         src={
//           reply.user?.image ? reply.user?.image : UserImage
//         }
//         alt={reply.user?.userName || reply.user?.email}
//         width={50}
//         height={50}
//       />
//       <div className="accordion-card__comment-body">
//         <span className="accordion-card__comment-body__name">
//           {reply.user?.userName}
//         </span>
//         <p>{reply.body}Reply</p>
//       </div>
//       <div className="accordion-card__post-likes">
//         <button>
//           <Image
//             src={chatIcon}
//             alt={
//               comment.user?.userName || comment.user?.email
//             }
//             width={30}
//             height={30}
//             className="accordion-card__comment-image"
//           />
//         </button>

//         <button className="accordion-card__comment-likes__button">
//           <Image
//             src={likeBlackIcon}
//             alt="like-icon"
//             width={20}
//             height={20}
//           />
//           {reply.likes}
//         </button>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default PostReply
