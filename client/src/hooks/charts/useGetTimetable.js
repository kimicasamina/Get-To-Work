import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate, formatDateShort } from "../../utils/helper";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/useAuth";

const getCurrentMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const getDaysArray = function (start, end) {
    const arr = [];
    for (
      const dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const daylist = getDaysArray(startDate, endDate);
  return daylist;
};

export default function useGetTimetable() {
  const { user } = useAuth();
  const [time, setTime] = useState(null);
  const projects = useSelector((state) => state.projects);
  const currentMonth = getCurrentMonth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data...");
        console.log("User:", user);
        const { data } = await axios.get(`/users/${user._id}/gettime`);
        setTime(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const formatTimetable = (daylist, time) => {
    const arr = [];
    for (let i = 0; i < daylist.length; i++) {
      let currentDate = {
        date: daylist[i],
        time: [],
        totalDuration: 0,
      };
      arr[i] = currentDate;
      for (let j = 0; j < time?.length; j++) {
        if (formatDate(daylist[i]) === formatDate(time[j].createdAt)) {
          const project = projects.filter((project) => {
            if (project._id === time[j].project) {
              console.log("name:", project.name);
              return project.name;
            }
          })[0];
          arr[i].time.push({
            project: project,
            duration: time[j].duration,
          });
          arr[i].totalDuration += time[j].duration;
        }
      }
    }

    return arr;
  };

  const timetable = formatTimetable(currentMonth, time);
  console.log("timetable:", timetable);

  return [timetable];
}
