import React, { useEffect } from "react";
import { Outlet, useNavigate, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/auth/useAuth";
import { useDispatch } from "react-redux";
import { getProjects } from "../../redux/actions/projects";

export default function ProfileLayout() {
  const { user, setUser, isFetching } = useAuth();
  console.log("user:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getProjects());
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (isFetching && !user) {
    return <h1 className="">Loading...</h1>;
  } else if (!isFetching && !user) {
    return <Navigate to="/signin" />;
  }

  if (!isFetching && user) {
    return <Outlet />;
  }
}
