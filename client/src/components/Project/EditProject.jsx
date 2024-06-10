import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/projects";
import { updateProject } from "../../redux/actions/projects";

// rrd
import { useLocation, useNavigate, useParams } from "react-router-dom";

// icons
import { CalendarIcon } from "../../assets/icons";

// datepicker library
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// tailwind
import tailwindConfig from "../../../tailwind.config";

export default function EditProject() {
  // hooks
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  // states
  const projects = useSelector((state) => state.projects);
  const project = projects.find((project) => project._id === params.id);
  const [isFetching, setIsFetching] = useState(true);
  const [newProject, setNewProject] = useState({
    name: project?.name,
    status: project?.status,
    createdAt: project?.createdAt,
    deadline: project?.deadline,
  });
  const options = ["in progress", "finished", "not started"];

  // events
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(newProject, params.id));
    navigate(`/project/${params.id}`);
  };

  useEffect(() => {
    setNewProject({ ...project });
    setIsFetching(false);
  }, [params.id]);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <form
      className="flex flex-col gap-y-2 "
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <h1 className="font-semibold text-3xl ">EDIT PROJECT</h1>
      <div className="flex flex-col w-full gap-x-2">
        <label htmlFor="" className="">
          Project Name
        </label>
        <input
          type="text"
          className="border-2 rounded-md p-2"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col w-full gap-x-2">
        <label htmlFor="" className="">
          Status
        </label>

        <select
          value={newProject.status}
          className="border-2 rounded-md p-2 bg-white"
          onChange={(e) =>
            setNewProject({ ...newProject, status: e.target.value })
          }
        >
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="flex flex-col w-full ">
          <div className="flex items-center ">
            <CalendarIcon
              fill={tailwindConfig.theme.colors.gray[900]}
              height={"20px"}
              className={`opacity-85`}
            />
            <label htmlFor="" className="">
              Start
            </label>
          </div>

          <DatePicker
            className="border-2 rounded-md p-2 w-full bg-white"
            selected={newProject.createdAt}
            onChange={(date) =>
              setNewProject({ ...newProject, createdAt: date })
            }
          />
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex items-center ">
            <CalendarIcon
              fill={tailwindConfig.theme.colors.gray[900]}
              height={"20px"}
              className={`opacity-85`}
            />
            <label htmlFor="" className="">
              End
            </label>
          </div>
          <DatePicker
            className="border-2 rounded-md p-2 w-full bg-white"
            selected={newProject.deadline}
            onChange={(date) =>
              setNewProject({ ...newProject, deadline: date })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-gray-100 rounded-sm p-3 mt-4 hover:bg-primaryDark hover:shadow-lg font-semibold hover:text-gray-100"
      >
        Update
      </button>
    </form>
  );
}
