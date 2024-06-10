import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/helper";

export default function useFormatAndTotalTime(obj) {
  const projects = useSelector((state) => state.projects);
  console.log("projects", projects);
  function sortTime(obj, projects) {
    let newTime = [];
    for (let i = 0; i < obj?.length; i++) {
      let currentDate = formatDate(obj[i].createdAt);
      let currentProject = projects.filter(
        (project) => project._id === obj[i].project
      )[0];
      let newDate = {
        date: currentDate,
        duration: obj[i].duration,
        project: [
          {
            name: currentProject.name,
            _id: currentProject._id,
          },
        ],
      };

      console.log(currentDate);
      newTime.push(newDate);
      for (let j = i + 1; j < obj.length; j++) {
        if (formatDate(obj[j].createdAt) === currentDate) {
          newDate.duration += obj[j].duration;
          const newProject = projects.filter(
            (project) => project._id === obj[j].project
          )[0];
          if (currentProject !== obj[j].project) {
            newDate.project.push({
              name: newProject.name,
              _id: newProject._id,
            });
          }
        }
      }
    }
    console.log(newTime);
    return newTime;
  }

  const time = sortTime(obj);
  console.log("newTime", time);
  return [time];
}
