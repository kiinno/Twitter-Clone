import React from "react";
import { BsHouseFill, BsBellFill, BsDoorClosed } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import useAuthentications from "@/hooks/useAuthentications";

const Sidebar = () => {
  const { data: currentUser } = useAuthentications();

  const items = [
    { label: "Home", href: "/", icon: BsHouseFill },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.user?._id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 px-4 md:px-6 h-full ">
      <div className="flex flex-col items-center md:items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href ?? Math.random()}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser ? (
            <SidebarItem
              key={"logout"}
              label={"Logout"}
              icon={BsDoorClosed}
              onClick={async () => {
                await signOut();
              }}
            />
          ) : null}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
