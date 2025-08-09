import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      const idToken = await user.getIdToken(); // <-- Get Firebase JWT

      // Send idToken to backend to create a secure session (cookie)
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include", // IMPORTANT! so browser accepts httpOnly cookie
      });
      
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || user.email || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      
      navigate(location.state ? location.state : "/");
    } catch (error) {
      const errorCode = error.code || error.message;
      setError(errorCode);
      
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorCode || "An error occurred during login",
      });
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await googleSignIn();
      const user = result.user;
      const idToken = await user.getIdToken(); // <-- Get Firebase JWT

      // Send idToken to backend to create a secure session (cookie)
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });
      
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || user.email || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      
      navigate(location.state ? location.state : "/");
    } catch (error) {
      setError(error.message || "Google login failed");
      
      await Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message || "An error occurred during Google login",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 shadow-2xl my-10 rounded-2xl">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
          Login to Carvio<span className="text-yellow-800">Go</span>
        </h1>
        <div className="lg:w-1/2 text-center px-8 md:px-32 lg:px-24 my-8">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome Back
            </p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl border-blue-500 text-black bg-transparent">
              {/* email input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handling email state
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl border-blue-500 text-black">
              {/* password input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="block border-2 border-black w-full mt-5 py-2 rounded-2xl hover:bg-gray-300 hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            >
              <FaGoogle className="inline"></FaGoogle> Login with Google
            </button>
            <button
              type="submit"
              className="group w-full relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50"
            >
              <span className="z-10 pr-2">Login</span>
              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </button>
            {/* Forgot Password link */}
            <div className="flex justify-between mt-4">
              <Link
                to={"/forget-password"}
                className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Forgot Password?
              </Link>
              <Link
                to="/registration"
                className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
