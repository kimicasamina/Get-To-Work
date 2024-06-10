import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  return (
    <>{tasks && tasks.map((task) => <TaskItem task={task} key={task._id} />)}</>
  );
}
