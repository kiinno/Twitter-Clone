import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);
  console.log("Posts", posts);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post: Record<string, any>) => (
          <PostItem userId={userId} key={post._id} data={post} />
        ))
      )}
    </>
  );
};

export default PostFeed;
