import React, { useState } from "react";
import {
  formatDate,
  getTaskLength,
  getCompletedTaskCount,
  formatPercentage,
} from "../../utils/helper";

// icons
import { EditIcon } from "../../assets/icons";
import { DeleteIcon } from "../../assets/icons";
import { CalendarIcon } from "../../assets/icons";

// rrd
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteToast from "../Modal/DeleteToast";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../../redux/reducers/ui";

// progress bar library
import ProgressBar from "@ramonak/react-progress-bar";
import tailwindConfig from "../../../tailwind.config";

export default function ProjectItem({ project, bgColor }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const numOfTask = getTaskLength(project.tasks);
  const numOfCompletedTask = getCompletedTaskCount(project.tasks);
  const percent = formatPercentage(numOfCompletedTask / numOfTask);

  return (
    <div
      className={`flex flex-col gap-y-2 border-b border-t border-${bgColor} p-2 text-gray-900 ${bgColor}`}
    >
      <div className="relative flex justify-between items-center font-semibold ">
        <h3 className="text-gray-900 w-full font-semibold ">{project.name}</h3>
        <div className="flex justify-end absolute right-0 h-full">
          <button onClick={(e) => dispatch(setIsModal(true))}>
            <DeleteIcon
              fill={tailwindConfig.theme.colors.gray[900]}
              width={"20px"}
              height={"20px"}
              className={"h-full"}
            />
          </button>
          <Link
            to={`/project/${project._id}/edit`}
            state={{ project: project }}
          >
            <EditIcon
              fill={tailwindConfig.theme.colors.gray[900]}
              width={"20px"}
              height={"20px"}
              className={`h-full`}
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-x-2 ">
        <span className="w-[20] rounded-sm bg-gray-900 text-gray-100 text-[12px] flex justify-center border-sm shadow-thin py-1 px-2">
          {project.status}
        </span>
        <div
          className={`flex-1 flex items-center justify-center text-[12px] text-center py-1 px-2  rounded-sm border-sm ${bgColor === "bg-gray-100" ? "bg-gray-200" : "bg-gray-100"} text-gray-900 shadow-thin`}
        >
          <CalendarIcon
            fill={`${tailwindConfig.theme.colors.gray[900]}`}
            width={"14px"}
            height={"14px"}
            className={"mr-1"}
          />
          {formatDate(project.createdAt)}
        </div>
        <div
          className={`flex-1 flex items-center text-[12px] text-center py-1 px-2  rounded-sm border-sm ${bgColor === "bg-gray-100" ? "bg-gray-200" : "bg-gray-100"} text-gray-900 shadow-thin`}
        >
          <CalendarIcon
            fill={`${tailwindConfig.theme.colors.gray[900]}`}
            width={"14px"}
            height={"14px"}
            className={"mr-1"}
          />
          {formatDate(project.deadline)}
        </div>
      </div>
      <ProgressBar
        completed={numOfCompletedTask}
        maxCompleted={numOfTask}
        className="progress--bar"
        barContainerClassName="progress--bar-container"
        labelClassName="progress--bar-label"
        customLabel={percent}
        height={8}
        bgColor={`${tailwindConfig.theme.colors.success}`}
        borderRadius="5px"
        labelColor={"white"}
        animateOnRender={true}
      />
    </div>
  );
}
