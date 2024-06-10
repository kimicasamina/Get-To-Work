import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth/useAuth";
import { getProjects } from "../../redux/actions/projects";

export default function ProjectLayout() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getProjects(user._id));
  }, [dispatch]);

  return (
    <div className="flex h-full z-5">
      <Sidebar />
      <main className="bg-white flex-1 pt-10 px-10">
        {params.id || location.pathname === "/project/add" ? (
          <Outlet />
        ) : (
          // <TaskTemplate />
          <h1>Project Management</h1>
        )}
      </main>
    </div>
  );
}
