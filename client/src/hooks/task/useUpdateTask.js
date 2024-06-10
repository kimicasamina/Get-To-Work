import React from "react";

export default function useUpdateTask(obj, id, newVal) {
  //   console.log(obj);
  //   console.log(id);
  //   console.log(newVal);

  const tasks = JSON.parse(JSON.stringify(obj));
  function updateTasks(obj) {
    console.log("updateTask");
    obj?.forEach((task, index = 0) => {
      Object.keys(task).forEach((key) => {
        if (key === "_id" && task[key] === id) {
          // obj[index] = newVal;
          // console.log(obj[index]);
          // console.log(task);
          task.name = newVal.name;
          task.isCheck = newVal.isCheck;
        }
        if (typeof task[key] === "object") {
          updateTasks(task[key]);
        }
      });
    });
    return obj;
  }

  const updatedTasks = updateTasks(tasks);
  // console.log("UPDATED TASKS:", updatedTasks);
  return updatedTasks;
}
