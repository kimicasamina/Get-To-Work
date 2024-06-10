import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex">
      <h1 className="text-[50px]">PAGE NOT FOUND</h1>
      <Link to="/">
        <button className="btn btn--purple">HOME</button>
      </Link>
    </div>
  );
}
