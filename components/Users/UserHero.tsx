import React from "react";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";
import Image from "next/image";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: user } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            alt="Cover Image"
            fill
            src={user?.coverImage}
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
