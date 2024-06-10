import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/projects";
import {
  formatDate,
  getHour,
  getMinutes,
  getSeconds,
} from "../../utils/helper";

export default function useFetchTime() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);
  const projects = useSelector((state) => state.projects);
  console.log("time", time);

  useEffect(() => {
    dispatch(getProjects());
    const fetchData = async () => {
      try {
        console.log("fetching data...");
        const { data } = await axios.get("/time");
        console.log("data", data);
        setTime(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  function iterate(arr) {
    console.log("arr", arr);
    const dates = arr;
    for (let i = 0; i < dates?.length; i++) {
      const iCurrentDate = formatDate(dates[i].createdAt);
      dates[i].createdAt = iCurrentDate;

      for (let j = i + 1; j < dates.length; j++) {
        const jCurrentDate = formatDate(dates[j].createdAt);
        if (iCurrentDate == jCurrentDate) {
          const newDuration = dates[i].duration + dates[j].duration;
          dates[i].duration = newDuration;
        }
      }
    }
    return dates;
  }

  const removeDuplicates = (arr) => {
    const unique = arr?.filter((obj, index) => {
      return index === arr.findIndex((t) => obj.createdAt === t.createdAt);
    });
    console.log(unique);
    return unique;
  };

  const dates = iterate(time);
  const uniqueDates = removeDuplicates(dates);
  console.log("unique duplicates", uniqueDates);
  return uniqueDates;
}
