import React, { useState } from "react";

export default function useDeleteTask(obj, id) {
  const tasks = JSON.parse(JSON.stringify(obj));
  function deleteTask(obj) {
    console.log("deleteTask");
    obj?.forEach((task, index = 0) => {
      Object.keys(task).forEach((key) => {
        if (key === "_id" && task[key] === id) {
          //   console.log("Task key:", task[key]);
          //   console.log("Task", task);
          //   console.log(index);
          obj.splice(index, 1);
        }
        if (typeof task[key] === "object") {
          deleteTask(task[key]);
        }
      });
    });
    return obj;
  }

  const newTasks = deleteTask(tasks);
  // console.log("DELETE TASKS:", newTasks);
  return newTasks;
}

// function getEachItem(obj) {
//     obj?.forEach((task, index = 0) => {
//       Object.keys(task).forEach((key) => {
//         if (key === "_id" && task[key] === action.payload._id) {
//           console.log("Task key:", task[key]);
//           console.log("Task", task);
//           console.log(index);
//           obj.splice(index, 1);
//           // return task
//         }
//         if (typeof task[key] === "object") {
//           getEachItem(task[key]);
//         }
//       });
//     });
//     return obj;
//   }
//   const tasksCopy = JSON.parse(JSON.stringify(tasks));
//   getEachItem(tasksCopy);
//   console.log(tasksCopy);
//   return [...tasksCopy];
