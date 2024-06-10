import React from "react";

export default function ProjectSummary({ summary }) {
  return (
    <div className="intro bg-gray-100 shadow-thick rounded-lg p-8 flex-2 flex flex-col gap-y-2 h-full justify-evenly w-[380px]">
      <h1 className="text-2xl text-gray-900 font-semibold ">Project Summary</h1>
      <div className="flex">
        <span className="bg-success text-white text-3xl flex px-4 w-14 justify-center  rounded-l-sm font-semibold shadow-sm ">
          {summary?.total}
        </span>
        <span className="bg-white  text-gray-900 text-lg flex-1 px-4 flex items-center rounded-r-md shadow-sm">
          Projects
        </span>
      </div>
      <div className="flex">
        <span className="bg-success text-white text-3xl flex px-4 w-14 justify-center  rounded-l-sm font-semibold shadow-sm ">
          {summary?.inProgress}
        </span>
        <span className="bg-white  text-gray-900 text-lg flex-1 px-4 flex items-center rounded-r-md shadow-sm">
          In Progress
        </span>
      </div>
      <div className="flex">
        <span className="bg-success text-white text-3xl flex px-4 w-14 justify-center  rounded-l-sm font-semibold shadow-sm ">
          {summary?.finished}
        </span>
        <span className="bg-white  text-gray-900 text-lg flex-1 px-4 flex items-center rounded-r-md shadow-sm">
          Finished
        </span>
      </div>
      <div className="flex">
        <span className="bg-success text-white text-3xl flex px-4 w-14 justify-center  rounded-l-sm font-semibold shadow-sm ">
          {summary?.notStarted}
        </span>
        <span className="bg-white  text-gray-900 text-lg flex-1 px-4 flex items-center rounded-r-md shadow-sm">
          Not Started
        </span>
      </div>
      <div className="flex">
        <span className="bg-success text-white text-3xl flex px-4 w-14 justify-center  rounded-l-sm font-semibold shadow-sm ">
          {summary?.overdue}
        </span>
        <span className="bg-white  text-gray-900 text-lg flex-1 px-4 flex items-center rounded-r-md shadow-sm">
          Overdue
        </span>
      </div>
    </div>
  );
}
