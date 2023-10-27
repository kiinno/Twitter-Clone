import React, { useCallback, useContext, useMemo, useState } from "react";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";
import Image from "next/image";
import useAuthentications from "@/hooks/useAuthentications";
import Button from "../Button";
import { useRouter } from "next/router";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import SystemContext from "@/utils/systemContext";
import toast from "react-hot-toast";
import axios from "axios";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const router = useRouter();
  const system = useContext(SystemContext);
  const { data: user, mutate: mutateFetchedUser } = useUser(userId);
  const { data: currentUser, mutate: mutateLoggedUser } = useAuthentications();
  const { isFollowing, isLoading, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return null;

    return format(new Date(user.createdAt), "MMMM, yyyy");
  }, [user?.createdAt]);

  // const isFollowed = useMemo(() => {
  //   if (!user && !currentUser?.user) return null;
  //   return currentUser?.user?.followingIds?.includes(user._id);
  // }, [currentUser, user]);

  // const toggleFollow = useCallback(() => {
  //   try {
  //     setIsLoading(true);

  //     if (user && currentUser?.user && isFollowed) {
  //       axios.post("/api/follow", { userId: user._id }).then((res) => {
  //         toast.success(`Followed ${user?.username}`);
  //         mutateFetchedUser();
  //         mutateLoggedUser();
  //       });
  //     } else if (user && currentUser?.user && !isFollowed) {
  //       axios
  //         .delete("/api/follow", {
  //           data: { userId: user._id },
  //         })
  //         .then((res) => {
  //           toast.success(`Followed ${user?.username}`);
  //           mutateFetchedUser();
  //           mutateLoggedUser();
  //         });
  //       toast.success(`Unfollowed ${user?.username}`);
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [
  //   currentUser?.user,
  //   isFollowed,
  //   mutateFetchedUser,
  //   mutateLoggedUser,
  //   user,
  // ]);

  return (
    <div className="pb-4 border-b-[1px] border-neutral-800">
      <div className="flex justify-end p-2">
        {user?._id === currentUser?.user?._id ? (
          <Button
            label="Edit"
            secondary
            onClick={() => system.showEditModal(true)}
          />
        ) : (
          <Button
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
            onClick={toggleFollow}
            disabled={isLoading}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user?.name}</p>
          <p className="text-neutral-400 text-sm">@{user?.username}</p>
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row gap-2 items-center text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length ?? 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followersCount ?? 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
