import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// components
import BarCharts from "../components/Charts/BarCharts";
import TimeCharts from "../components/Charts/TimeCharts";
import Clock from "../components/Clock/Clock";
import Weather from "../components/Weather/Weather";
import ProjectSummary from "../components/Statistics/ProjectSummary";

// hooks
import useFetchTime from "../hooks/charts/useFetchTime";
import { useAuth } from "../hooks/auth/useAuth";
import useGetTimetable from "../hooks/charts/useGetTimetable";

// utils
import { formatDate } from "../utils/helper";
import useFormatAndTotalTime from "../hooks/charts/useFormatAndTotalTime";

// icons and svg
import { DevIllustration } from "../assets/icons";

export default function Dashboard() {
  const { user, isFetching } = useAuth();
  const [timetable] = useGetTimetable();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/projects/${user._id}/projectsummary`
        );
        setSummary(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (isFetching && user) {
    return <h1 className="">Loading...</h1>;
  }

  return (
    <div className="flex h-full gap-x-8 gap-y-8 flex-col justify-between px-8 py-8">
      <div className="flex flex-1 gap-x-8 w-full h-[50%] justify-between">
        <div className="intro bg-gray-100 shadow-thick rounded-lg p-8 flex-1 flex items-start relative ">
          <div className="rounded-lg flex flex-col h-full w-full  font-normal z-4 justify-between items-start gap-y-4">
            <div className="text-gray-900 leading-tight flex-1 ">
              <div className="flex">
                <p className="text-5xl">Hi</p>
                {"   "}
                <p className="text-success pl-2 text-5xl">{user?.username}</p>
              </div>
              <p className="text-lg font-light">Have a thoughtful day ahead.</p>
              <Clock />
            </div>
            <Weather />
          </div>

          <DevIllustration
            className={`h-full max-w-[380px] flex justify-center items-center absolute z-10 -right-4 -top-4`}
          />
        </div>
        <ProjectSummary summary={summary} />
      </div>
      <div className="flex flex-1 w-full h-[50%] gap-x-4 ">
        <div className="intro bg-gray-100 shadow-thick rounded-lg p-4 flex-1 flex-col-4 ">
          <BarCharts data={timetable} />
        </div>
      </div>
    </div>
  );
}
