import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PostFeed from "@/components/Posts/PostFeed";
import UserBio from "@/components/Users/UserBio";
import UserHero from "@/components/Users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: user, isLoading } = useUser(userId as string);

  if (isLoading || !user) return <Loader />;

  return (
    <>
      <Header label="User Profile" showBackArrow />
      <UserHero userId={user._id} />
      <UserBio userId={user._id} />
      <PostFeed userId={user._id} />
    </>
  );
};

export default UserView;
