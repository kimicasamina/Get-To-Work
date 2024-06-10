import React, { useEffect } from "react";
// hooks
import { useTimer } from "../../hooks/timer/useTimer";
// redux
import { useDispatch, useSelector } from "react-redux";

export default function SelectProject({ projects }) {
  const { selected, setSelected } = useTimer();
  const dispatch = useDispatch();

  const onSelect = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <div className="w-full max-w-[580px] flex items-center mt-10 rounded-t-sm ">
      <select
        value={selected}
        className="flex-1 font-semibold bg-gray-900 text-gray-100 shadow-thick px-2 py-4 rounded-t-sm outline-none w-full"
        onChange={(e) => onSelect(e)}
      >
        {!selected ? (
          <option disabled selected value="" className="bg-white text-gray-900">
            Select a Project
          </option>
        ) : null}
        {projects.map((project, index) => {
          return (
            <option
              key={index}
              value={project._id}
              className="bg-white text-gray-900"
            >
              {project.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
