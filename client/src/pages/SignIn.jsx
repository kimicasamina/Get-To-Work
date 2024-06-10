import React, { useState } from "react";
import { Link, redirect, Navigate } from "react-router-dom";
import axios from "axios";

// icons
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/auth/useAuth";
import useGoogleAuth from "../hooks/auth/useGoogleAuth";

export default function SignIn() {
  const { user, setUser, setIsFetching } = useAuth();
  const googleLogin = useGoogleAuth();
  console.log(user);
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [togglePassword, setTogglePassword] = useState({
    password: input.password,
    toggle: false,
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      console.log("Sigin innnn");
      try {
        const { data } = await axios.post("/users/login", input);
        console.log("data", data);
        setUser(data);
        setIsFetching(false);
        setRedirect(true);
        console.log("Successfully logged in.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="bg-white">
      <form
        name="signin"
        className="max-w-screen-md mx-auto border-2 rounded-lg mt-10 p-10 shadow-lg "
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <h1 className="text-3xl font-semibold">Welcome Back!</h1>
        <span className="">Don't Have An Account?</span>{" "}
        <Link to="/signup">
          <span className="text-primary font-semibold">Sign Up</span>
        </Link>
        <div className="flex flex-col gap-y-8 my-8  ">
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 focus:bg-white"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900"
            >
              Password
            </label>
            <input
              type={togglePassword.toggle ? "text" : "password"}
              name="password"
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 focus:bg-white"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />

            {togglePassword.toggle ? (
              <RiEyeFill
                className="absolute top-3 right-4 text-lg"
                onClick={(e) =>
                  setTogglePassword({
                    password: input.password,
                    toggle: !togglePassword.toggle,
                  })
                }
              />
            ) : (
              <RiEyeCloseLine
                className="text-lg absolute top-3 right-4"
                onClick={(e) =>
                  setTogglePassword({
                    password: input.password,
                    toggle: !togglePassword.toggle,
                  })
                }
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <button
            type="submit"
            className="btn hover:bg-primaryDark bg-primary w-full text-gray-100 py-2 font-semibold hover:shadow-md"
          >
            Sign In
          </button>
          {googleLogin}
        </div>
      </form>
    </div>
  );
}
