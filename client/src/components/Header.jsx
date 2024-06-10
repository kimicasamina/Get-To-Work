import React, { useContext, useState } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

import axios from "axios";

// icons
import { BriefcaseIcon } from "../assets/icons";
import { BarChartIcon } from "../assets/icons";
import { TaskIcon } from "../assets/icons";
import { TimerIcon } from "../assets/icons";
import { HeadphoneIcon } from "../assets/icons";
import { PersonIcon } from "../assets/icons";
import briefcase from "../assets/briefcase.png";

// hooks
import { useAuth } from "../hooks/auth/useAuth";

export default function Header() {
  const { user, setUser, setIsFetching } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handleLogout = async (e) => {
    const { data } = await axios.delete("/users/logout");
    console.log("data", data);
    setUser(null);
    setIsFetching(false);
    navigate("/signin");
  };

  return (
    <header className="shadow-lg bg-gray-900 flex justify-center items-center h-[80px] w-full ">
      <nav className="w-full flex px-12 py-4">
        <Link
          to="/dashboard"
          className="flex items-center mr-20 text-[16px] text-primary gap-x-2 "
        >
          <img src={briefcase} alt="" className="w-8 h-8" />
          <span
            className="text-lg w-full font-semibold font-inter"
            style={{ letterSpacing: "1px" }}
          >
            GET TO WORK
          </span>
        </Link>

        <div className="flex-1 flex justify-between items-center gap-x-6">
          <div className="flex gap-x-6 items-center justify-between">
            <NavLink
              to="/dashboard"
              className={`cursor-pointer flex items-center gap-x-1 text-gray-100 hover:text-primary transition-200 ease-in-out text-md ${location.pathname === "/dashboard" ? "text-primary" : ""}`}
            >
              <BarChartIcon />
              <span className="">Dashboard</span>
            </NavLink>
            <NavLink
              to="/project"
              className={`cursor-pointer flex items-center gap-x-1 text-gray-100 hover:text-primary transition-200 ease-in-out text-md ${location.pathname === "/project" ? "text-primary" : ""}`}
            >
              <TaskIcon />
              <span className="">Project</span>
            </NavLink>
            <NavLink
              to="/timer"
              className={`cursor-pointer flex items-center gap-x-1 text-gray-100 hover:text-primary transition-200 ease-in-out text-md ${location.pathname === "/timer" ? "text-primary" : ""}`}
            >
              <TimerIcon />
              <span className="cursor-pointer hover:cursor-pointer">Timer</span>
            </NavLink>
            <NavLink
              to="/ambience"
              className={`cursor-pointer flex items-center gap-x-1 text-gray-100 hover:text-primary transition-200 ease-in-out text-md ${location.pathname === "/ambience" ? "text-primary" : ""}`}
            >
              <HeadphoneIcon />
              <span className="">Ambience</span>
            </NavLink>
          </div>
          <div className="flex-1 flex justify-end items-center gap-x-6 px-4">
            {user && user.username ? (
              <>
                <div className="flex items-center gap-x-1 text-gray-100 text-lg text-[14px]">
                  <PersonIcon />
                  <span className="text-gray-100 text-lg">{user.username}</span>
                </div>
                <button
                  className="hover:bg-primaryDark bg-primary text-gray-100 rounded-sm px-6 py-2 hover:shadow-md text-[14px] font-semibold transition-200 delay-75 "
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin">
                <button className="hover:bg-primaryDark bg-primary text-gray-100 rounded-sm px-6 py-2 hover:shadow-md text-[14px] font-semibold transition-200 delay-75 ">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
