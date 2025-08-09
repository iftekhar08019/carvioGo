import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import carAnimation from "../assets/car.json"; 

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-white px-4 text-center">
      {/* Lottie Animation */}
      <div className="w-full max-w-md">
        <Lottie animationData={carAnimation} loop={true} />
      </div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mt-6">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">
        Oops! The page you are looking for doesn't exist.
      </p>

      {/* Back to Home */}
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
