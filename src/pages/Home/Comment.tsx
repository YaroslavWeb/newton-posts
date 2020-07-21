import React from "react";
import { IComment } from "../../interfaces";

interface CommentProps {
  comment: IComment;
  index: number;
}

export const Comment: React.FC<CommentProps> = ({ comment, index }) => {
  return (
    <>
      {index !== 0 && <hr />}
      <span className="card-title">{comment.name}</span>
      <p className='comment-user'>{comment.email}</p>
      <p>{comment.body}</p>
    </>
  );
};
