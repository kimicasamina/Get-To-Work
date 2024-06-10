import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";

import {
  updateTask,
  addSubtask,
  deleteTask,
} from "../../../redux/actions/tasks";
import { getProjects } from "../../../redux/actions/projects";

// icons
import { RiCheckboxBlankLine } from "react-icons/ri";
import { RiCheckboxLine } from "react-icons/ri";
import { getCompletedTaskCount } from "../../../utils/helper";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { useAuth } from "../../../hooks/auth/useAuth";

export default function TaskItem({ task }) {
  const { user } = useAuth();
  const [input, setInput] = useState({
    name: task?.name,
    isCheck: task?.isCheck,
  });

  const [newInput, setNewInput] = useState({ name: "" });
  const [showInput, setShowInput] = useState(false);
  const [showSubtask, setShowSubtask] = useState(true);
  // const [tasksCount, setTasksCount] = useState({
  //   numOfTask: getTaskLength(tasks),
  //   numOfTaskCompleted: getCompletedTaskCount(tasks),
  // });

  // hooks
  const dispatch = useDispatch();

  // events
  const onKeyDown = async (e) => {
    const key = e.key || e.keyCode;
    console.log("key", key);

    // DELETE TASK
    if (key === "Backspace") {
      if (e.target.name === "task" && e.target.value === "") {
        dispatch(deleteTask(task._id));
      }
      if (e.target.name === "newTask" && e.target.value === "") {
        // dispatch(deleteTask(task._id));
        setShowInput(false);
      }
    }

    if (key === "Enter") {
      // UPDATE EXISTING TASK & SHOW EMPTY TEXT INPUT
      if (e.target.name === "task" && e.target.value !== "") {
        console.log("Update task");
        dispatch(updateTask(input, task._id));
        setShowInput(true);
      }

      // APPEND NEW SUBTASK TO EXISTING TASK
      if (e.target.name === "newTask" && e.target.value !== "") {
        console.log("Add subtask");
        dispatch(addSubtask(newInput, task._id)).then((data) => {
          console.log("NEW TASK DATA:", data);
          // setShowInput(true);
          setNewInput({ name: "" });
        });
        dispatch(getProjects(user._id));
      }
    }
  };

  const onBlur = async (e) => {
    console.log(`saving ${task.name}...`);
    if (e.target.value !== "") {
      dispatch(updateTask(input, task._id));
    }
  };

  const onCheckChange = async (e) => {
    const newInputVal = { ...input, isCheck: !input.isCheck };
    setInput(newInputVal);
    dispatch(updateTask(newInputVal, task._id));
    dispatch(getProjects(user._id));
  };

  const onShowSubtask = async (e) => {
    setShowSubtask(!showSubtask);
  };

  return (
    <>
      <li className="w-full list-none">
        <div
          className={`flex flex-wrap items-center ${input.isCheck ? "opacity-50 strikethrough" : null}`}
        >
          <button className="" onClick={(e) => onShowSubtask(e)}>
            {showSubtask && task.subtask.length > 0 ? (
              <RiArrowDropDownLine className="h-[100%] w-[100%]" />
            ) : null}
          </button>
          <button className="" onClick={(e) => onShowSubtask(e)}>
            {!showSubtask && task.subtask.length > 0 ? (
              <RiArrowDropUpLine />
            ) : null}
          </button>
          <button className="" onClick={(e) => onShowSubtask(e)}>
            {showSubtask && task.subtask.length === 0 ? null : null}
          </button>
          <button className="" onClick={(e) => onCheckChange(e)}>
            {input.isCheck ? (
              <RiCheckboxLine className="" />
            ) : (
              <RiCheckboxBlankLine className="" />
            )}
          </button>

          <input
            type="text"
            className={`w-full flex-1  px-1 outline-2 rounded-sm text-md font-google `}
            value={input.name}
            name="task"
            placeholder="edit task..."
            onChange={(e) => setInput({ name: e.target.value })}
            onKeyDown={(e) => onKeyDown(e)}
            onBlur={(e) => onBlur(e)}
            onClick={(e) => console.log("onclick:", task)}
          />
        </div>
        {showInput ? (
          <div className="flex flex-wrap items-center ml-8">
            {/* {task && task.subtask.length > 0 ? <RiArrowDropDownLine /> : null}
          <RiCheckboxBlankLine className="" /> */}
            <input
              type="text"
              className="w-full flex-1 font-google px-1 outline-2 rounded-sm text-md"
              name="newTask"
              value={newInput.name}
              autoFocus={true}
              placeholder="new task..."
              onChange={(e) => setNewInput({ name: e.target.value })}
              onKeyDown={(e) => onKeyDown(e)}
            />
          </div>
        ) : null}
        {showSubtask && task.subtask && task.subtask.length > 0 ? (
          <div className="ml-8 ">
            <TaskList tasks={task.subtask} key={task._id} />
          </div>
        ) : null}
      </li>
    </>
  );
}
