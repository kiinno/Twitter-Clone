import React from "react";

interface CommentFeedProps {
  comments: Record<string, any>[];
}
const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment?._id}>{comment?.body}</div>
      ))}
    </>
  );
};

export default CommentFeed;
