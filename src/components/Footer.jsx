import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-auto">
      <div className="w-11/12 mx-auto py-8 flex flex-col md:flex-row items-center justify-around">
        {/* Logo + Name */}
        <Link
          to="/"
          className="btn btn-ghost text-3xl flex items-center justify-center gap-2"
        >
          <img className="w-20" src={logo} alt="logo" />
          <h1 className="font-bold">
            Carvio<span className="text-yellow-800">Go</span>
          </h1>
        </Link>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="text-blue-600 hover:text-blue-800 text-xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-500 hover:text-pink-700 text-xl" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="text-red-600 hover:text-red-800 text-xl" />
          </a>
        </div>
      </div>

      <div className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} CarvioGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
