import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/actions/user";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [togglePassword, setTogglePassword] = useState({
    password: input.password,
    toggle: false,
  });

  const [toggleConfirmPassword, setToggleConfirmPassword] = useState({
    password: input.confirmPassword,
    toggle: false,
  });

  const validateFormInputs = async (e) => {
    console.log("validation");
    let re = "/^[^s@]+@[^s@]+.[^s@]+$/";
    const validationErrors = {};
    if (!input.username.trim()) {
      // check if empty
      validationErrors.username = "username is required.";
    }
    if (!input.email.trim()) {
      validationErrors.email = "email is required.";
    } else if (/^[^s@]+@[^s@]+.[^s@]+$/.test(input.email)) {
      validationErrors.email = "email is not valid.";
    }
    if (!input.password.trim()) {
      validationErrors.password = "password is required.";
    } else if (input.password.length < 6) {
      validationErrors.password = "password should be at least 6 char.";
    }
    if (input.password !== input.confirmPassword) {
      validationErrors.confirmPassword = "password not matched.";
    }

    setErrors(validationErrors);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!errors || errors.length === 0) {
      console.log("No errors");
      const { data } = await axios.post("/users/signup", input);
      console.log("data:", data);
      if (data.created) {
        console.log("Navigate to signin screen");
        navigate("/signin");
      }
    }
  };

  return (
    <div className="bg-white">
      <form
        className="max-w-screen-md mx-auto border-2 rounded-lg shadow-lg mt-10 p-10"
        onSubmit={(e) => {
          validateFormInputs(input);
          handleOnSubmit(e);
        }}
      >
        <h1 className="text-3xl font-semibold">Create An Account</h1>
        <span className="">Already Registered?</span>{" "}
        <Link to="/signin">
          <span className="text-primary font-semibold">Sign In</span>
        </Link>
        <div className="flex flex-col gap-y-6 my-8  ">
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              value={input.email}
              name="email"
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 "
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            {errors?.email && (
              <span className="w-full p-2 mt-1 bg-alert text-gray-100 rounded-lg">
                {errors?.email}
              </span>
            )}
          </div>
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={input.username}
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 "
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            {errors?.username && (
              <span className="w-full p-2 mt-1 bg-alert text-gray-100 rounded-lg">
                {errors?.username}
              </span>
            )}
          </div>
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900 "
            >
              Password
            </label>
            <input
              name="password"
              type={togglePassword.toggle ? "text" : "password"}
              value={input.password}
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 focus:bg-white"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            {errors?.password && (
              <span className="w-full p-2 mt-1 bg-alert text-gray-100 rounded-lg">
                {errors?.password}
              </span>
            )}

            {togglePassword.toggle ? (
              <RiEyeFill
                id="password"
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
                id="password"
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
          <div className="flex flex-col group relative">
            <label
              htmlFor=""
              className="absolute text-sm -top-2 left-2 bg-white px-2 group-focus-within:text-gray-900"
            >
              Confirm password
            </label>
            <input
              name="confirmPassword"
              type={toggleConfirmPassword.toggle ? "text" : "password"}
              value={input.confirmPassword}
              className="border-2 border-gray-900 rounded-lg p-2 py-2 focus:outline-bg-gray-300 focus:bg-white"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            {errors?.confirmPassword && (
              <span className="w-full p-2 mt-1 bg-alert text-gray-100 rounded-lg">
                {errors?.confirmPassword}
              </span>
            )}
            {toggleConfirmPassword.toggle ? (
              <RiEyeFill
                id="confirmPassword"
                className="absolute top-3 right-4 text-lg"
                onClick={(e) =>
                  setToggleConfirmPassword({
                    password: input.confirmPassword,
                    toggle: !toggleConfirmPassword.toggle,
                  })
                }
              />
            ) : (
              <RiEyeCloseLine
                id="confirmPassword"
                className="text-lg absolute top-3 right-4"
                onClick={(e) =>
                  setToggleConfirmPassword({
                    password: input.confirmPassword,
                    toggle: !toggleConfirmPassword.toggle,
                  })
                }
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn w-full hover:bg-primaryDark bg-primary text-gray-100 py-2 font-semibold hover:shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
