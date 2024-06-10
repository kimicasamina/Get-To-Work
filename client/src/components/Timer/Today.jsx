import React, { useState, useEffect } from "react";
// helpers
import { formatDuration, getHour, getMinutes } from "../../utils/helper";
// axios
import axios from "axios";
// progress bar library
import ProgressBar from "@ramonak/react-progress-bar";
// icon
import { DeleteIcon } from "../../assets/icons";
// tailwind
import tailwindConfig from "../../../tailwind.config";

export default function Today({ today, setToday }) {
  console.log("today:", today);
  const getMaxValue = () => {
    const sortedArr = today.sort((a, b) => {
      return b.duration - a.duration;
    });
    return sortedArr[0].duration;
  };

  const onDelete = async (e, id) => {
    const data = await axios.delete(`/time/${id}/delete`);
    const newToday = today.filter((time) => time._id !== id);
    setToday(newToday);
  };

  return (
    <div className="flex flex-col w-full max-w-[580px] bg-white shadow-thick text-gray-900 h-[350px] rounded-b-sm ">
      <div
        className="flex flex-col overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {today && today.length > 0 ? (
          today.map((time, index) => {
            const hours = getHour(time.duration);
            const minutes = getMinutes(time.duration);
            return (
              <div
                className={`flex flex-col items-start p-2 border-b border-t ${index % 2 === 0 ? "bg-gray-100 border-gray-100 " : "bg-gray-200 border-gray-200"}`}
                key={time._id}
              >
                <div className="flex items-center ">
                  <button
                    className="mr-2 "
                    onClick={(e) => onDelete(e, time._id)}
                  >
                    <DeleteIcon
                      fill={`${tailwindConfig.theme.colors.gray[900]}`}
                      width={"20px"}
                      height={"20px"}
                      className={"h-full"}
                    />
                  </button>

                  <span className="w-full ">{time?.project?.name}</span>
                </div>
                <ProgressBar
                  completed={time.duration}
                  maxCompleted={getMaxValue()}
                  className="progress--bar"
                  barContainerClassName="progress--bar-container progress--bar-container-timer"
                  labelClassName="progress--bar-label"
                  height={10}
                  bgColor={`${tailwindConfig.theme.colors.success}`}
                  borderRadius="5px"
                  labelColor={"white"}
                  animateOnRender={true}
                  customLabel={`${hours > 0 ? hours + "hs" : ""} ${minutes} m`}
                />
              </div>
            );
          })
        ) : (
          <>
            <p className="text-gray-100 text-lg">Daily time table is empty.</p>
            <p className="text-gray-100 text-lg">Start</p>
          </>
        )}
      </div>
    </div>
  );
}
