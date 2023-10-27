import useUsers from "@/hooks/useUsers";
import React from "react";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (Array.isArray(users) && users.length === 0) return null;
  console.log("users", users);
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {Array.isArray(users) &&
            users.slice(0, 5).map((user: Record<string, any>) => (
              <div className="flex flex-row gap-4" key={user._id}>
                <Avatar userId={user._id} />
                <div className="flex flex-col ">
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-neutral-400 text-sm">@{user.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
