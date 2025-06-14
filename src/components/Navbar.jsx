import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
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
    { name: "Home", href: "#" },
    { name: "Available Cars", href: "#" },
  ];

  const loggedInLinks = [
    { name: "Add Car", href: "#" },
    { name: "My Cars", href: "#" },
    { name: "My Bookings", href: "#" },
  ];

  const renderLinks = () => {
    const allLinks = user ? [...commonLinks, ...loggedInLinks] : [...commonLinks];
    return allLinks.map((link, index) => (
      <React.Fragment key={link.name}>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href={link.href}>
            {link.name}
          </a>
        </li>
        {index !== allLinks.length - 1 && (
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex items-center bg-white justify-between">
        {/* Logo */}
        <a className="text-3xl font-bold leading-none flex items-center gap-2" href="#">
          <img className="w-10" src={logo} alt="Logo" />
          <h1 className="text-xl">Carvio<span className="text-yellow-800">GO</span></h1>
        </a>

        {/* Center Nav Menu */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {renderLinks()}
        </ul>

        {/* Desktop Right Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {user ? (
            <button onClick={handleLogout} className="text-sm text-red-500 font-bold hover:text-red-700">
              Logout
            </button>
          ) : (
            <>
              <a className="py-2 px-4 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl" href="#">Sign In</a>
              <a className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl" href="#">Sign Up</a>
            </>
          )}
        </div>

        {/* Mobile Burger */}
        <div className="lg:hidden ml-auto">
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-2xl font-bold leading-none flex items-center gap-2" href="#">
              <img className="w-10" src={logo} alt="Logo" />
              Carvio<span className="text-yellow-800">GO</span>
            </a>
            <button className="navbar-close">
              <svg className="h-6 w-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-2">
            {renderLinks()}
          </ul>

          <div className="mt-auto pt-6">
            {user ? (
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-700 rounded">
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <a className="flex-1 px-4 py-3 text-center bg-gray-50 hover:bg-gray-100 text-sm font-semibold rounded-xl" href="#">Sign In</a>
                <a className="flex-1 px-4 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl" href="#">Sign Up</a>
              </div>
            )}
            <p className="my-4 text-xs text-center text-gray-400">© 2025 CarvioGO</p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
