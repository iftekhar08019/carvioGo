import React from "react";
import banner from "../assets/banner.gif";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Find the Ride That Moves You.
          </h1>
          <p className="mb-5">
            Discover the finest selection of premium cars, carefully curated to
            reflect your unique style, ambition, and passion for the road.
            Whether you're seeking luxury, performance, or innovation, our
            collection is designed to elevate your driving experience and help
            you stand out wherever you go.
          </p>

          <Link
            to="/available-cars"
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Browse Cars
            </span>
            <span className="relative invisible">Browse Cars</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
