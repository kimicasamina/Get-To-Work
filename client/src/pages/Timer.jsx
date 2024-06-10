import React, { useEffect, useState, useRef } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
// helpers
import { getFormattedTime, getHour, getMinutes } from "../utils/helper";
// custom hooks
import { useTimer } from "../hooks/timer/useTimer";
// axios
import axios from "axios";
import { useAuth } from "../hooks/auth/useAuth";

// components
import Today from "../components/Timer/Today";
import SelectProject from "../components/Timer/SelectProject";

export default function Timer() {
  const {
    time,
    setTime,
    isRunning,
    setIsRunning,
    isPause,
    setIsPause,
    timerRef,
    selected,
    setSelected,
  } = useTimer();

  console.log("time:", time);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const projects = useSelector((state) => state?.projects);
  const project = projects[0];
  const startRef = useRef();

  const [today, setToday] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        console.log("fetching data...");
        const data = await axios
          .get(`/time/${user._id}/today`)
          .then(({ data }) => {
            console.log("data", data);
            setToday(data);
            setIsFetching(false);
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setIsFetching]);

  if (isFetching && today.length === 0) {
    return <h1>Loading...</h1>;
  }

  const onStart = (e) => {
    if (selected) {
      console.log("start");
      setIsRunning(true);
    } else {
      alert("Please select project");
    }
  };

  const onPause = (e) => {
    console.log("pause");
    setIsPause(true);
    clearInterval(timerRef.current);
  };

  const onStop = async (e) => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    const { data } = await axios.post(`/time/create`, {
      duration: time,
      user: user._id,
      project: selected,
    });
    console.log("data", data);
    setToday([...today, data]);
    setTime(0);
  };

  const onContinue = (e) => {
    console.log("continue");
    setIsRunning(true);
    setIsPause(false);
  };

  return (
    <div className="flex flex-col items-center bg-white h-full w-full px-8 py-8 bg-success">
      <h1 className="text-[100px] font-inter text-gray-900 font-bold ">
        {getFormattedTime(time)}
      </h1>

      <div className="flex gap-x-4">
        {isRunning ? (
          <button
            className="w-24 bg-primary text-gray-100 rounded-sm p-3 mt-4 hover:bg-primaryDark hover:shadow-lg font-semibold hover:text-gray-100 transition-all duration-200"
            onClick={(e) => onStop(e)}
          >
            <span className="">Stop</span>
          </button>
        ) : (
          <button
            ref={startRef}
            className="w-24 bg-primary text-gray-100 rounded-sm p-3 mt-4 hover:bg-primaryDark hover:shadow-lg font-semibold hover:text-gray-100 transition-all duration-200"
            onClick={(e) => onStart(e)}
          >
            <span className="">Start</span>
          </button>
        )}

        {isPause ? (
          <button
            className="w-24 bg-primary text-gray-100 rounded-sm p-3 mt-4 hover:bg-primaryDark hover:shadow-lg font-semibold hover:text-gray-100 transition-all duration-200"
            onClick={(e) => onContinue(e)}
          >
            <span className="">Resume</span>
          </button>
        ) : (
          <button
            className="w-24 bg-primary text-gray-100 rounded-sm p-3 mt-4 hover:bg-primaryDark hover:shadow-lg font-semibold hover:text-gray-100 transition-all duration-200"
            onClick={(e) => onPause(e)}
          >
            <span className="">Pause</span>
          </button>
        )}
      </div>
      <SelectProject projects={projects} />
      <Today today={today} setToday={setToday} />
    </div>
  );
}
