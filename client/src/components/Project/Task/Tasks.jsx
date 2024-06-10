import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
// import { addTask, getTasks } from "../../../action/tasks";
// import { addTask, getTasks } from "../../../redux/actions/projects";
import { addTask, getTasks } from "../../../redux/actions/tasks";
import TaskList from "./TaskList";

// icons
import { RiCheckboxBlankLine } from "react-icons/ri";
// import { getCompletedTaskCount, getTaskLength } from "../../../utils/helpers";

export default function Tasks() {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  // state
  const projects = useSelector((state) => state.projects);
  const project = projects.filter((project) => project._id === params.id)[0];
  const tasks = useSelector((state) => state.tasks);
  const [input, setInput] = useState({ name: "" });
  console.log(project);

  useEffect(() => {
    console.log("Fetching tasks...");
    async function fetchData() {
      try {
        dispatch(getTasks(params.id));
        // setIsFetching(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [params.id, dispatch]);

  // events
  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (input.name !== "") {
        // add root node
        dispatch(addTask(input, params.id));
        setInput({ name: "" });
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="text-3xl font-semibold mb-2 font-google text-md">
        {project?.name}
      </h1>

      <div
        className="h-full overflow-y-scroll "
        style={{ scrollbarWidth: "none" }}
      >
        {tasks && tasks.length > 0 ? <TaskList tasks={tasks} /> : null}
        <div className="flex flex-wrap items-center">
          <RiCheckboxBlankLine className="mr-1" />
          <input
            value={input.name}
            type="text"
            className="w-full flex-1 font-google text-md"
            autoFocus={true}
            placeholder="add new block..."
            onChange={(e) => setInput({ name: e.target.value })}
            onKeyDown={(e) => onKeyDown(e)}
          />
        </div>
      </div>
    </div>
  );
}
