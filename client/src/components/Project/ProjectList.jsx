import React, { useState, useEffect } from "react";
// components
import ProjectItem from "./ProjectItem";
// redux
import { useSelector, useDispatch } from "react-redux";
// rrd
import { useParams, Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  return (
    <div
      className="flex flex-col h-full overflow-y-scroll "
      style={{ scrollbarWidth: "none" }}
    >
      {projects && projects.length > 0
        ? projects.map((project, index) => (
            <Link to={`/project/${project._id}`} key={index}>
              <ProjectItem
                project={project}
                key={project._id}
                bgColor={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              />
            </Link>
          ))
        : null}
    </div>
  );
}
