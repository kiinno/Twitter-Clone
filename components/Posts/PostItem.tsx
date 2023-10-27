import React, { useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import SystemContext from "@/utils/systemContext";
import useAuthentications from "@/hooks/useAuthentications";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const { isLiked, toggleLike } = useLike(data?._id);

  const goToUser = useCallback(
    async (ev: any) => {
      ev?.stopPropagation();
      router.push(`/users/${data.user._id}`);
    },
    [data, router]
  );

  const goToPost = useCallback(
    async (ev: any) => {
      router.push(`/posts/${data._id}`);
    },
    [data, router]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data?.createdAt), {
      addSuffix: true,
    });
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?._id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data?.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data?.user?.name}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data?.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={25} />
              <p className="">{data?.comments?.length}</p>
            </div>
            <div
              onClick={toggleLike}
              className={`flex flex-row items-center text-${
                isLiked ? "red" : "neutral"
              }-500 gap-2 cursor-pointer transition ${
                isLiked ? "hover:text-red-300" : "hover:text-red-500"
              }`}
            >
              <AiOutlineHeart size={25} />
              <p className="">{data?.likedIds?.length ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
