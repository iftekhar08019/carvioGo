import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaCar, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been logged out successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      await Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred during logout. Please try again.",
      });
    }
  };

  useEffect(() => {
    const burger = document.querySelectorAll(".navbar-burger");
    const menu = document.querySelectorAll(".navbar-menu");
    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    const toggleMenu = () => menu.forEach((el) => el.classList.toggle("hidden"));

    burger.forEach((btn) => btn.addEventListener("click", toggleMenu));
    close.forEach((btn) => btn.addEventListener("click", toggleMenu));
    backdrop.forEach((bg) => bg.addEventListener("click", toggleMenu));

    return () => {
      burger.forEach((btn) => btn.removeEventListener("click", toggleMenu));
      close.forEach((btn) => btn.removeEventListener("click", toggleMenu));
      backdrop.forEach((bg) => bg.removeEventListener("click", toggleMenu));
    };
  }, []);

  const commonLinks = [
    { name: "Home", href: "/" },
    { name: "Available Cars", href: "/available-cars" },
  ];

  const loggedInLinks = [
    { name: "Add Car", href: "/add-car" },
    { name: "My Cars", href: "/my-cars" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const renderLinks = () => {
    const allLinks = user ? [...commonLinks, ...loggedInLinks] : [...commonLinks];
    return allLinks.map((link, index) => (
      <motion.li
        key={link.name}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Link 
          to={link.href} 
          className={`px-4 py-2 rounded-xl transition-all duration-300 relative group ${
            isActiveLink(link.href)
              ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50 font-semibold"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`}
        >
          {link.name}
          {isActiveLink(link.href) && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      </motion.li>
    ));
  };

  const renderMobileLinks = () => {
    const allLinks = user ? [...commonLinks, ...loggedInLinks] : [...commonLinks];
    return allLinks.map((link) => (
      <motion.li
        key={link.name}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          to={link.href} 
          className={`py-3 px-4 rounded-xl transition-all duration-300 ${
            isActiveLink(link.href)
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/50"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {link.name}
        </Link>
      </motion.li>
    ));
  };

  return (
    <div className="bg-white sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <nav className="relative px-4 py-4 flex items-center justify-between lg:w-10/12 mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to={"/"} className="flex items-center gap-3 group">
            <div className="relative">
              <img className="w-12 h-12 object-contain" src={logo} alt="Logo" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Carvio<span className="text-yellow-600">GO</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Drive Your Dreams</p>
            </div>
          </Link>
        </motion.div>

        {/* Center Nav Menu */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-4 absolute left-1/2 transform -translate-x-1/2">
          {renderLinks()}
        </ul>

        {/* Desktop Right Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex items-center gap-3 ml-auto"
        >
          {user ? (
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  className="flex items-center gap-2 py-2 px-6 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                  to={"/login"}
                >
                  <FaSignInAlt className="w-4 h-4" />
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  className="flex items-center gap-2 py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  to={"/register"}
                >
                  <FaUserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile Burger */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:hidden ml-auto"
        >
          <button className="navbar-burger flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FaBars className="w-5 h-5" />
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-black/50"></div>
        <motion.nav
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-l border-gray-200 overflow-y-auto shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-3">
              <img className="w-10 h-10" src={logo} alt="Logo" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Carvio<span className="text-yellow-600">GO</span>
                </h1>
                <p className="text-xs text-gray-500">Drive Your Dreams</p>
              </div>
            </Link>
            <button className="navbar-close w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <ul className="space-y-3 flex-1">
            {renderMobileLinks()}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-200">
            {user ? (
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    to="/login"
                  >
                    <FaSignInAlt className="w-4 h-4" />
                    Sign In
                  </Link>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    to="/register"
                  >
                    <FaUserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
            <p className="mt-4 text-xs text-center text-gray-500">© 2025 CarvioGO</p>
          </div>
        </motion.nav>
      </div>
    </div>
  );
};

export default Navbar;
