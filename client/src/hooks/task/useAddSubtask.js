import React from "react";

export default function useAddSubtask(obj, id, newTask) {
  const tasks = JSON.parse(JSON.stringify(obj));
  function addSubtask(obj) {
    console.log("updateSubtask");
    obj?.forEach((task, index = 0) => {
      Object.keys(task).forEach((key) => {
        if (key === "_id" && task[key] === id) {
          // task.subtask.push(newTask);
          // task.subtask.unshift(newTask);
          // obj.subtask.unshift(newTask);
          // obj[index].subtask.unshift(newTask);
          // console.log("task", task);
          task.subtask.unshift(newTask);
          // obj[index]
        }
        if (typeof task[key] === "object") {
          addSubtask(task[key]);
        }
      });
    });
    return obj;
  }

  const updatedTasks = addSubtask(tasks);
  // console.log("UPDATED TASKS:", updatedTasks);
  return updatedTasks;
}
