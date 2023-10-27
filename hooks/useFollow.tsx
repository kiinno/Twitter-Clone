import React, { useCallback, useContext, useMemo, useState } from "react";
import useAuthentications from "./useAuthentications";
import useUser from "./useUser";
import SystemContext from "@/utils/systemContext";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const system = useContext(SystemContext);
  const { data: currentUser, mutate: mutateCurrentUser } = useAuthentications();
  const { mutate: mutateFetchedUser, data: user } = useUser(userId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(user);

  const isFollowing = useMemo(() => {
    const list = currentUser?.user?.followingIds ?? [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return system.showLoginModal(true);

    try {
      setIsLoading(true);
      let request;
      if (isFollowing)
        request = axios.delete("/api/follow", {
          data: { userId },
        });
      else request = axios.post("/api/follow", { userId });
      const res = await request;
      console.log("Response : ", res);
      if (res.config.method === "post") {
        toast.success(`Followed ${user?.username}`);
      } else if (res.config.method === "delete") {
        toast.success(`Unfollowed ${user?.username}`);
      }
      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    isFollowing,
    mutateCurrentUser,
    mutateFetchedUser,
    system,
    user?.username,
    userId,
  ]);
  console.log(isFollowing);
  return {
    currentUser,
    mutateCurrentUser,
    mutateFetchedUser,
    user,
    isFollowing,
    toggleFollow,
    isLoading,
    setIsLoading,
  };
};

export default useFollow;
