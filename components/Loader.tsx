import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={50} color="rgba(173, 216, 230, 1)" />
    </div>
  );
};

export default Loader;
