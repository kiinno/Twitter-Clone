import CommentFeed from "@/components/CommentFeed";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PostItem from "@/components/Posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);
  if (isLoading || !fetchedPost) return <Loader />;
  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        isComment={true}
        postId={postId as string}
        placeholder="Tweet your reply"
      />
      {/* <CommentFeed comments={fetchedPost?.comments} /> */}
    </>
  );
};

export default PostView;
