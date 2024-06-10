import React, { useState } from "react";
// rrd
import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// icons
import { SearchIcon, AddIcon } from "../../assets/icons";
// components
import ProjectList from "../Project/ProjectList";

export default function Sidebar() {
  const projects = useSelector((state) => state.projects);
  const [searchKey, setSearchKey] = useState(null);

  const searchProject = searchKey
    ? projects.filter((project) => {
        let name = project.name.toLowerCase();
        if (name.includes(searchKey.toLowerCase())) {
          return project;
        }
      })
    : null;

  return (
    <div className="flex flex-col w-[400px] bg-gray-900 drop-shadow-lg">
      <div className="relative flex mx-1 my-2 z-2">
        <input
          type="text"
          className="w-full pl-8 p-1 rounded-sm border-2 text-sm outline-none"
          placeholder="Search project..."
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <SearchIcon
          width={"24px"}
          height={"24px"}
          fill={`bg-gray-900`}
          className={"h-[100%] w-6 absolute text-gray-900 z-2 top-0 left-1"}
        />

        <Link to="/project/add">
          <AddIcon
            width={"24px"}
            height={"24px"}
            fill={`bg-gray-900`}
            className={"h-[100%] text-gray-900 w-6 absolute z-2 top-0 right-1"}
          />
        </Link>
      </div>
      <ProjectList
        projects={
          searchProject && searchProject.length > 0 ? searchProject : projects
        }
      />
    </div>
  );
}
