// src/components/Loading.js (or wherever you keep your components)

import React from "react";
import loadimg from "../assets/loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
     <div className="w-full max-w-md">
        <Lottie animationData={loadimg} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
