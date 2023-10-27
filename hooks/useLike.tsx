import React, { useCallback, useContext, useMemo, useState } from "react";
import useAuthentications from "./useAuthentications";
import useUser from "./useUser";
import SystemContext from "@/utils/systemContext";
import toast from "react-hot-toast";
import axios from "axios";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = (postId: string) => {
  const system = useContext(SystemContext);
  const { data: currentUser, mutate: mutateCurrentUser } = useAuthentications();
  const { mutate: mutateFetchedPost, data: post } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLiked = useMemo(() => {
    const list = post?.likedIds ?? [];
    return list.some((user: any) => user?._id === currentUser?.user?._id);
  }, [currentUser, post]);

  const toggleLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();
      if (!currentUser) return system.showLoginModal(true);

      try {
        setIsLoading(true);
        let request;
        if (isLiked)
          request = axios.delete("/api/posts/like", {
            data: { postId },
          });
        else request = axios.post("/api/posts/like", { postId });
        const res = await request;
        mutateFetchedPosts();
        mutateFetchedPost();
        if (res.config.method === "post") {
          toast.success(`Tweet Liked`);
        } else if (res.config.method === "delete") {
          toast.success(`Unliked`);
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentUser,
      isLiked,
      mutateFetchedPost,
      mutateFetchedPosts,
      postId,
      system,
    ]
  );
  return { isLiked, toggleLike, isLoading };
};

export default useLike;
