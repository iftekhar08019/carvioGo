import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaGoogle, FaPhotoFilm } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Registration = () => {
  const { createUser, setUser, updateUser, googleSignIn } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const length = password.length >= 6;

    if (!uppercase.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!lowercase.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!length) return "Password must be at least 6 characters long.";
    return "";
  };

  // ---- FIREBASE TOKEN-BASED REGISTRATION ----
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passErr = validatePassword(password);
    if (passErr) {
      setPasswordError(passErr);
      return;
    }
    setPasswordError("");

    try {
      // 1. Register user with Firebase
      const result = await createUser(email, password);
      const user = result.user;
      await updateUser({ displayName: name, photoURL: photo });
      // 2. Get JWT token from Firebase
      const idToken = await user.getIdToken();
      // 3. Call backend to verify, set HTTP-only cookie, and create user record
      const response = await fetch("https://carvio-go-server.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // crucial for http-only cookies
        body: JSON.stringify({ idToken }),
      });
      if (!response.ok) {
        throw new Error("Failed to login/register (token not accepted)");
      }
      const data = await response.json();
      setUser({ ...user, displayName: name, photoURL: photo });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      // 1. Get Firebase JWT
      const idToken = await user.getIdToken();
      // 2. Send token to backend login endpoint (creates user/cookie)
      const response = await fetch("https://carvio-go-server.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
      if (!response.ok) throw new Error("Google sign-in failed on backend");
      setUser(user);
      navigate("/");
    } catch (error) {
      setError(error.message || "Google sign-in failed");
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 shadow-2xl my-10 rounded-2xl">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="lg:text-4xl text-xl font-bold text-center mt-15">
          Register to Carvio<span className="text-yellow-800">Go</span>
        </h1>
        <div className="lg:w-1/2 text-center px-8 md:px-32 lg:px-24 my-8">
          <form
            onSubmit={handleRegister}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello There
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome to Carvio<span className="text-yellow-800">Go</span>
            </p>

            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <FaUserAlt />
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            {nameError && <p className="text-xs text-red-500">{nameError}</p>}

            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black bg-transparent">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0..."
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <FaPhotoFilm />
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="photo"
                placeholder="Photo URL"
              />
            </div>

            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl border-blue-500 text-black">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2..."
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="block border-2 border-black w-full mt-5 py-2 rounded-2xl hover:bg-gray-300 hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            >
              <FaGoogle className="inline" /> Register with Google
            </button>

            <button
              type="submit"
              className="group w-full relative inline-flex h-[56px] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50"
            >
              <span className="z-10 pr-2">Register</span>
              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-neutral-50"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.146 3.146c.196-.195.512-.195.708 0l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.293 8H2.5a.5.5 0 010-1h8.793L8.146 3.854a.5.5 0 010-.708z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <div className="flex justify-between mt-4">
              <Link
                to="/login"
                className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Already have an account yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
