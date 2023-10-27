import React, { useContext } from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import SystemContext from "@/utils/systemContext";

const SidebarTweetButton = () => {
  const system = useContext(SystemContext);
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => system.showLoginModal(true)}
        className="lg:hidden w-12 h-12 hover:bg-sky-600 cursor-pointer bg-sky-500 rounded-full flex items-center justify-center p-3 mt-6"
      >
        <FaFeather size={24} />
      </div>

      <div
        onClick={() => system.showLoginModal && system.showLoginModal(true)}
        className="hidden py-2 px-4 lg:block rounded-full hover:bg-opacity-90 cursor-pointer transition-opacity bg-sky-500 w-full mt-6"
      >
        <p className="text-center font-semibold text-lg">Tweet</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
