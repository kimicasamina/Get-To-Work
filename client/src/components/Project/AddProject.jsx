import React, { useState } from "react";
// icons
import { RiCalendarCheckLine } from "react-icons/ri";
import { RiArrowRightFill } from "react-icons/ri";
// datetime picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// redux
import { useDispatch } from "react-redux";
import { createProject } from "../../redux/actions/projects";
// rrd
import { useNavigate } from "react-router-dom";
// hooks
import { useAuth } from "../../hooks/auth/useAuth";

export default function Project() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  // state
  const [project, setProject] = useState({
    name: "",
    status: "not started",
    createdAt: new Date(),
    deadline: new Date(),
    user: user._id,
  });
  const options = ["in progress", "finished", "not started"];

  // events
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("NEW PROJECT FORM:", project);
    dispatch(createProject(project));
    navigate(`/project`);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={(e) => handleOnSubmit(e)}>
      <h1 className="font-semibold text-3xl">CREATE NEW PROJECT</h1>
      <div className="flex flex-col w-full gap-x-2">
        <label htmlFor="" className="">
          Project Name
        </label>
        <input
          type="text"
          className="border-2 rounded-md p-2 bg-white"
          placeholder="e.g., Get To Work"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col w-full gap-x-2">
        <label htmlFor="" className="">
          Status
        </label>

        <select
          value={project.status}
          className="border-2 rounded-md p-2 bg-white"
          onChange={(e) => setProject({ ...project, status: e.target.value })}
        >
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="flex flex-col w-full gap-x-2">
          <div className="flex items-center gap-x-[2px]">
            <RiCalendarCheckLine />
            <label htmlFor="" className="">
              Start
            </label>
          </div>

          <DatePicker
            className="border-2 rounded-md p-2 w-full bg-white"
            selected={project.createdAt ?? new Date()}
            onChange={(date) => setProject({ ...project, createdAt: date })}
          />
        </div>

        <div className="flex flex-col w-full gap-x-2">
          <div className="flex items-center gap-x-[2px]">
            <RiCalendarCheckLine />
            <label htmlFor="" className="">
              End
            </label>
          </div>
          <DatePicker
            className="border-2 rounded-md p-2 w-full bg-white"
            selected={project.deadline ?? new Date()}
            //   onSelect={}
            //   onChange={(date) => setEndDate(date)}
            onChange={(date) => setProject({ ...project, deadline: date })}
          />
        </div>
      </div>

      <button className="w-full bg-primary hover:bg-primaryDark text-gray-100 rounded-sm p-3 mt-4 hover:text-gray-100 font-semibold">
        Create
      </button>
    </form>
  );
}
