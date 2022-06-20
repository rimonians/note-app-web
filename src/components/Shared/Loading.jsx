import React from "react";
import { FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Loading = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={`hero ${isAuthenticated ? "h-full" : "h-screen"}`}>
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center">
          <FaCircle className="text-3xl text-primary" />
          <p className="py-2">Please wait a bit</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
